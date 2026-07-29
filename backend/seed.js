import mongoose from "mongoose";
import dotenv from "dotenv";
import Testimonial from "./models/Testimonial.js";
import STATUS from "./constants/status.js";

dotenv.config();

const sampleTestimonials = [
  {
    name: "Emily Watson",
    email: "emily.w@designcraft.io",
    company: "DesignCraft Studios",
    testimonial: "The onboarding was seamlessly smooth, and the customer support team resolved my query in less than 5 minutes. Best SaaS tool we adopted this year!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    status: STATUS.APPROVED,
    sentiment: "Positive",
    summary: "Customer praised lightning-fast support and seamless onboarding experience.",
    keywords: ["onboarding", "customer support", "fast resolution"],
    category: "Customer Support",
    moderationSuggestion: "Approve",
  },
  {
    name: "Marcus Chen",
    email: "marcus.chen@nexuslabs.com",
    company: "Nexus Labs",
    testimonial: "Outstanding product quality! The analytical reporting dashboard saved our marketing team over 15 hours every single week.",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: STATUS.APPROVED,
    sentiment: "Positive",
    summary: "High product quality and time savings on weekly marketing analytics.",
    keywords: ["product quality", "analytics", "time saving"],
    category: "Product Quality",
    moderationSuggestion: "Approve",
  },
  {
    name: "Sophia Rodriguez",
    email: "sophia@brightbrand.co",
    company: "BrightBrand Agency",
    testimonial: "Super clean UI and intuitive user flow. My team didn't even need any training to get started collecting reviews.",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: STATUS.APPROVED,
    sentiment: "Positive",
    summary: "Intuitive UI enabled instant adoption without formal team training.",
    keywords: ["clean ui", "intuitive", "easy adoption"],
    category: "Product Quality",
    moderationSuggestion: "Approve",
  },
  {
    name: "David Kim",
    email: "david.k@fintechsurge.com",
    company: "FinTech Surge",
    testimonial: "Pricing is very fair for the value provided. The custom widget embedding feature integrated seamlessly into our Next.js frontend.",
    rating: 4,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: STATUS.APPROVED,
    sentiment: "Positive",
    summary: "Fair pricing structure and easy iframe widget integration with Next.js.",
    keywords: ["pricing", "widget embed", "value for money"],
    category: "Pricing",
    moderationSuggestion: "Approve",
  },
  {
    name: "Jessica Taylor",
    email: "jessica@cloudscale.net",
    company: "CloudScale Systems",
    testimonial: "The iframe widget customization option with accent colors matched our corporate branding perfectly. Highly recommended!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    status: STATUS.APPROVED,
    sentiment: "Positive",
    summary: "Widget accent color customization perfectly aligns with corporate branding.",
    keywords: ["branding", "customization", "iframe widget"],
    category: "Product Quality",
    moderationSuggestion: "Approve",
  },
  {
    name: "Liam O'Connor",
    email: "liam@growthhacker.io",
    company: "GrowthHacker Media",
    testimonial: "Initial setup was straightforward, but I would love to see more export options in the analytics section in future updates.",
    rating: 4,
    photo: "",
    status: STATUS.APPROVED,
    sentiment: "Neutral",
    summary: "Easy setup with request for additional reporting export formats.",
    keywords: ["easy setup", "analytics", "feature request"],
    category: "Product Quality",
    moderationSuggestion: "Approve",
  },
  {
    name: "Rachel Green",
    email: "rachel@monicafield.com",
    company: "Central Perk Retail",
    testimonial: "Fast response time from account managers and top-notch security features. Gives us total peace of mind.",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    status: STATUS.APPROVED,
    sentiment: "Positive",
    summary: "Responsive support and robust security features ensure peace of mind.",
    keywords: ["account manager", "security", "peace of mind"],
    category: "Customer Support",
    moderationSuggestion: "Approve",
  },
  {
    name: "Vikram Patel",
    email: "vikram@innovatehub.in",
    company: "Innovate Hub",
    testimonial: "The AI sentiment analysis feature automatically categorizes incoming feedback, making review moderation effortless for our admin team.",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    status: STATUS.APPROVED,
    sentiment: "Positive",
    summary: "AI sentiment analysis automated customer feedback moderation efficiently.",
    keywords: ["ai sentiment", "automation", "moderation"],
    category: "Product Quality",
    moderationSuggestion: "Approve",
  },
  {
    name: "Hannah Abbott",
    email: "hannah@apexconsulting.com",
    company: "Apex Consulting",
    testimonial: "Great software overall, but experienced a brief minor slowdown during peak business hours last Tuesday.",
    rating: 3,
    photo: "",
    status: STATUS.PENDING,
    sentiment: "Neutral",
    summary: "Solid tool with minor peak-hour speed slowdown.",
    keywords: ["performance", "minor issue", "feedback"],
    category: "Product Quality",
    moderationSuggestion: "Approve",
  },
  {
    name: "Carlos Mendez",
    email: "carlos@velocitydigital.com",
    company: "Velocity Digital",
    testimonial: "Customer success team guided us through enterprise migration step by step. Extremely dedicated support!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    status: STATUS.APPROVED,
    sentiment: "Positive",
    summary: "Dedicated customer success team guided smooth enterprise migration.",
    keywords: ["customer success", "migration", "dedicated support"],
    category: "Customer Support",
    moderationSuggestion: "Approve",
  },
  {
    name: "Oliver Vance",
    email: "oliver@spampromos.biz",
    company: "Spam Promos Ltd",
    testimonial: "BUY CHEAP FOLLOWERS INSTANTLY CLICK HERE HTTP://SPAMMY-LINK.BIZ BEST DISCOUNTS GUARANTEED!!!",
    rating: 1,
    photo: "",
    status: STATUS.REJECTED,
    sentiment: "Negative",
    summary: "Spam content promoting unauthorized external links.",
    keywords: ["spam", "unauthorized link"],
    category: "General",
    moderationSuggestion: "Reject",
  },
  {
    name: "Amanda Brooks",
    email: "amanda@horizontech.io",
    company: "Horizon Tech",
    testimonial: "The widget embedding took literally 2 minutes to put on our WordPress site. Conversion rate increased by 22%!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    status: STATUS.APPROVED,
    sentiment: "Positive",
    summary: "WordPress widget embedding boosted website conversion rates by 22%.",
    keywords: ["conversion rate", "wordpress embed", "easy setup"],
    category: "Product Quality",
    moderationSuggestion: "Approve",
  },
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("❌ MONGO_URI is missing in .env");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB for seeding...");

    // Optionally clear existing sample data
    await Testimonial.deleteMany({});
    console.log("🗑️ Cleared existing testimonials...");

    const inserted = await Testimonial.insertMany(sampleTestimonials);
    console.log(`🎉 Successfully seeded ${inserted.length} testimonials into MongoDB Atlas!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedDatabase();
