import foodModel from "../models/foodModel.js";

// 🔤 Fuzzy match
const fuzzyMatch = (text, word) => {
  if (!text || !word) return false;

  text = text.toLowerCase();
  word = word.toLowerCase();

  if (text.includes(word)) return true;

  let mismatch = 0;
  for (let i = 0; i < Math.min(text.length, word.length); i++) {
    if (text[i] !== word[i]) mismatch++;
    if (mismatch > 1) return false;
  }

  return true;
};

export const chatHandler = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Please enter a message" });
    }

    const foods = await foodModel.find({});
    let lowerMsg = message.toLowerCase().trim();
    const words = lowerMsg.split(/\s+/);

    // 🧠 Synonyms
    const synonyms = {
      "gram flour": "besan",
      "chickpea flour": "besan",
      "paneer": "cottage cheese"
    };

    Object.keys(synonyms).forEach(key => {
      if (lowerMsg.includes(key)) {
        lowerMsg = lowerMsg.replace(key, synonyms[key]);
      }
    });

    // 🎯 Intent detection
    const isCheap = lowerMsg.includes("cheap") || lowerMsg.includes("under");
    const isVeg = lowerMsg.includes("veg");
    const isSpicy = lowerMsg.includes("spicy");
    const isSweet = lowerMsg.includes("sweet");

    // 🔍 Filtering
    let filtered = foods.filter(item => {
      const name = item.name.toLowerCase();
      const category = item.category.toLowerCase();
      const ingredients = (item.ingredients || []).map(i => i.toLowerCase());

      return words.some(word =>
        fuzzyMatch(name, word) ||
        fuzzyMatch(category, word) ||
        ingredients.some(ing => fuzzyMatch(ing, word)) ||
        ingredients.some(ing => lowerMsg.includes(ing))
      );
    });

    if (isCheap) filtered = filtered.filter(item => item.price <= 200);
    if (isVeg) filtered = filtered.filter(item => item.type === "veg");
    if (isSpicy) filtered = filtered.filter(item => (item.tags || []).includes("spicy"));
    if (isSweet) filtered = filtered.filter(item => (item.tags || []).includes("sweet"));

    // fallback
    if (filtered.length === 0 && words.length > 1) {
      const lastWord = words[words.length - 1];

      filtered = foods.filter(item => {
        const name = item.name.toLowerCase();
        const category = item.category.toLowerCase();
        const ingredients = (item.ingredients || []).map(i => i.toLowerCase());

        return (
          fuzzyMatch(name, lastWord) ||
          fuzzyMatch(category, lastWord) ||
          ingredients.some(ing => fuzzyMatch(ing, lastWord))
        );
      });
    }

    // no result
    if (filtered.length === 0) {
      const suggestions = foods.sort(() => 0.5 - Math.random()).slice(0, 5);

      return res.json({
        reply: "😔 No exact match found. Showing suggestions:",
        items: suggestions
      });
    }

    return res.json({
      reply: "🤖 Here are some options for you:",
      items: filtered.slice(0, 5)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Something went wrong" });
  }
};