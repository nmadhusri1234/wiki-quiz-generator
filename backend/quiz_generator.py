import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
# REMOVED: from langchain.chains import LLMChain

load_dotenv()

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.1-8b-instant"
)

prompt = PromptTemplate(
    input_variables=["content"],
    template="""
Generate 5 multiple choice quiz questions from this article.

Each question should contain:
- Question
- 4 options
- Correct answer
- Difficulty
- Explanation

Keep answers concise.

Article:
{content}
"""
)

# NEW: Create the chain using LangChain Expression Language (LCEL)
# This pipes the prompt inputs into the LLM, and passes the output to a string parser
chain = prompt | llm

def generate_quiz(content):
    try:
        short_content = content[:1200]
        
        # NEW: Use .invoke() instead of .run()
        # Pass variables as a dictionary matching your template variables
        response = chain.invoke({"content": short_content})
        
        # ChatGroq returns a message object; .content extracts the raw text response
        return response.content

    except Exception as e:
        return f"Error generating quiz: {str(e)}"