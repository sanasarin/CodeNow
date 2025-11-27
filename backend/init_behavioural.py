import requests

behavioral_questions = [
    {
        "name": "Recent Projects",
        "desc": "Tell me about the most recent project you worked on. What were your responsibilities?"
    },
    {
        "name": "Improving Design",
        "desc": "Describe a time you were able to improve upon the design that was originally suggested."
    },
    {
        "name": "Proud Projects",
        "desc": "Tell me about the project you are most proud of, and what your contribution was."
    },
    {
        "name": "Deployment",
        "desc": "Describe your production deployment process."
    },
    {
        "name": "Technical Knowledge",
        "desc": "Give an example of where you have applied your technical knowledge in a practical way."
    },
    {
        "name": "Managing Code",
        "desc": "How did you manage source code?"
    },
    {
        "name": "Quality Deliverables",
        "desc": "What did you do to ensure quality in your deliverables?"
    },
    {
        "name": "Going Above & Beyond",
        "desc": "When was the last time you downloaded a utility from the internet to make your work more productive, "
                "and what was it?"
    },
    {
        "name": "Development Tools",
        "desc": "What development tools have you used?"
    },
    {
        "name": "Programming Languages",
        "desc": "What languages have you programmed in?"
    },
    {
        "name": "Source Control",
        "desc": "What source control tools have you used?"
    },
]


for behavioral_question in behavioral_questions:
    response = requests.post('http://localhost:8000/problems/behavioral_problems/', data=behavioral_question)
    if response.status_code == 200:
        print(f"{behavioral_question['name']} submitted successfully")
    else:
        print(f"Error submitting {behavioral_question['name']}: {response.status_code}")