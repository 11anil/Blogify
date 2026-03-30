import { GoogleGenerativeAI } from "@google/generative-ai";

const generateBlogDescription = async (req, res) => {
    try {
        const { title, subTitle } = req.body;

        if (!title || !subTitle) {
            return res.json({ success: false, message: "Title and Subtitle are required for AI generation" });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            // Mock fallback for demonstration if no API key is provided
            console.warn("GEMINI_API_KEY is not set. Using mock response.");
            const mockHTML = `
                <h2>Introduction to ${title}</h2>
                <p>This blog explores the nuances of ${subTitle}. We delve deep into the core concepts and provide actionable insights for our readers.</p>
                <h3>Key Takeaways</h3>
                <ul>
                    <li>Understanding the basics of ${title}</li>
                    <li>Advanced techniques for ${subTitle}</li>
                    <li>Practical examples and case studies</li>
                </ul>
                <h3>Conclusion</h3>
                <p>Stay tuned for more updates on ${title} and how it impacts the industry.</p>
            `;
            return res.json({ success: true, description: mockHTML, message: "Mock AI generation (Add GEMINI_API_KEY for real AI)" });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Write a detailed, structured blog description in HTML format for a blog titled "${title}" with the subtitle "${subTitle}". 
        The output should be professional, engaging, and ready to be inserted into a rich text editor. 
        Include headings (h2, h3), paragraphs, and lists. Don't include any markdown code blocks, just the HTML content.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up the response if the AI included markdown wrappers
        const cleanedText = text.replace(/```html|```/g, "").trim();

        res.json({ success: true, description: cleanedText });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.json({ success: false, message: error.message });
    }
};

export { generateBlogDescription };
