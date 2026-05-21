from quiz_generator import generate_quiz

sample_text = """
Alan Turing was a British mathematician and computer scientist.
He worked at Bletchley Park during World War II.
"""

result = generate_quiz(sample_text)

print(result)