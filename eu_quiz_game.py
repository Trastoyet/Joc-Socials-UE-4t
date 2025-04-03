import random

eu_countries = {
    'Austria': 'Vienna',
    'Belgium': 'Brussels',
    'Bulgaria': 'Sofia',
    'Croatia': 'Zagreb',
    'Cyprus': 'Nicosia',
    'Czech Republic': 'Prague',
    'Denmark': 'Copenhagen',
    'Estonia': 'Tallinn',
    'Finland': 'Helsinki',
    'France': 'Paris',
    'Germany': 'Berlin',
    'Greece': 'Athens',
    'Hungary': 'Budapest',
    'Ireland': 'Dublin',
    'Italy': 'Rome',
    'Latvia': 'Riga',
    'Lithuania': 'Vilnius',
    'Luxembourg': 'Luxembourg City',
    'Malta': 'Valletta',
    'Netherlands': 'Amsterdam',
    'Poland': 'Warsaw',
    'Portugal': 'Lisbon',
    'Romania': 'Bucharest',
    'Slovakia': 'Bratislava',
    'Slovenia': 'Ljubljana',
    'Spain': 'Madrid',
    'Sweden': 'Stockholm'
}

def generate_country_question(country):
    questions = [
        f"Which EU country has a name that starts with '{country[0]}'?",
        f"Which EU member state is home to {eu_countries[country]}?",
        f"Can you name the EU country where you would find {eu_countries[country]}?",
        f"What European Union country has {eu_countries[country]} as its capital city?"
    ]
    return random.choice(questions)

def play_game():
    score = 0
    total_questions = len(eu_countries)
    countries = list(eu_countries.keys())
    random.shuffle(countries)

    print("Welcome to the EU Countries and Capitals Quiz!")
    print("Answer the questions about EU countries and their capitals.\n")

    for country in countries:
        # Country question
        question = generate_country_question(country)
        print(question)
        answer = input("Your answer: ").strip().lower()
        
        if answer == country.lower():
            print("Correct!")
            score += 1
        else:
            print(f"Wrong! The correct answer is {country}")

        # Capital question
        print(f"What is the capital of {country}?")
        answer = input("Your answer: ").strip().lower()
        
        if answer == eu_countries[country].lower():
            print("Correct!")
            score += 1
        else:
            print(f"Wrong! The capital of {country} is {eu_countries[country]}")
        
        print(f"Current score: {score}/{(total_questions * 2)}\n")

    final_percentage = (score / (total_questions * 2)) * 100
    print(f"Game Over! Final score: {score}/{(total_questions * 2)} ({final_percentage:.1f}%)")

if __name__ == "__main__":
    play_game()