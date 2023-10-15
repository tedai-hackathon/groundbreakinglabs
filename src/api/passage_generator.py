
import openai
import json
import time
def data_clean(data, types):
    out = []
    for i in range(len(data["Question"])):
        question = {}
        question["question"] = data["Question"][i][0]
        question["correct_answer"] = ord(data["Answers"][i].lower()) - 97
        question["answers"] = data["Question"][i][1:]
        question["type"] = types[i]
        
        out.append(question)
    data["Question"] = out
    del data["Answers"]

def generate(passions, categories):
    f = open("apikey.txt", "r")
    key = f.readline()
    f.close() 
    openai.api_key = key




    messages = [ {"role": "system","content": "You are an expert educator"} ]


    message = '''
    Write me a passage about one or more people with random names at fourth-grade reading level based loosely on exactly one of my passions. Ask me 4 multiple choice question to demonstrate my reading comprehension, also fourth-grade level. The first question should be about ''' + categories[0] + '''; the second question should be about ''' + categories[1] + '''; the third question should be about ''' + categories[2] + '''; the fourth question should be about ''' + categories[3] + '''. The answers to these questions should not be explicitly stated in the text, but should also not be ambiguous. Also provide the answer. It should be in the following format: Passage: _passage_ Questions: _questions_ Answers: _answers:

    Example 1:
    My passions: farms

    Passage:
    Lisa and the Pigpen
    Peter lived in a small town with his mama, papa, brothers, and sisters. Everyone had chores. Peter’s
    job was to look after his youngest sister Lisa. Lisa was three years old and very curious. She liked to
    wander out of the house and play outside.
    One day Peter and Lisa were playing hide-and-seek in the house, and the game turned into a chase.
    Crash! Bang! Peter tripped and landed in the clothes basket on the kitchen floor.
    Lisa fell on the floor beside him and laughed. “Do it again,” begged Lisa.
    “Oh, no,” said Mama. “You two go outside with your chasing and stay out of my way. Don’t get into
    trouble.”
    The children ran out the door into the sunshine. At that moment, Mr. Brown was leading his pig down
    the road. He was going to Ms. Smith’s house to show her how big the pig had grown.
    Lisa laughed and ran to catch up to Mr. Brown and his pig. Peter yelled after her.
    “Where are you going?” Lisa asked Mr. Brown.
    Mr. Brown turned around and saw the little girl following him. “I am going to show my friend, Ms.
    Smith, how big my pig has grown.”
    “I’m going, too,” said Lisa. She marched right along with Mr. Brown.
    “Okay, I’m going, too,” Peter sighed, and followed behind them.
    When they arrived at Ms. Smith’s house, Mr. Brown put his pig in the pigpen at the back of the
    house. Lisa followed Mr. Brown and his pig. When she saw the other pigs, she squealed with delight. The
    pigs squealed and oinked.
    “Don’t go in the pigpen, children,” Mr. Brown said. Then he went in the house.
    Lisa wanted to play with the pigs. She started across the pen to pet the pigs. On her way, she slipped
    in the mud and fell in a puddle. Lisa was wet from her head to her toes with black, dirty pigpen water.
    She splashed with her hands and kicked her feet, spreading mud all over her clothes. “I’m a pig! I’m a
    pig!” she squealed. “Come out of there right now, Lisa!” screamed Peter.
    At that moment, Mr. Brown and Ms. Smith came outside. They heard the children shouting and the
    pigs squealing.
    “Someone is in the pigpen with the pigs!” Ms. Smith exclaimed.
    They went to the back of the house and found Lisa splashing in the water.
    Peter was shouting at Lisa. “Lisa! Look at you! What will Mama say? You get out of there now!”
    “I’m a pig!” said Lisa. She wouldn’t come out of the pigpen.
    Peter crawled through the fence to get a hold of Lisa. Lisa ran from him. Peter slipped and fell in the
    black, dirty pigpen puddle.
    “Oh, no! Now we’re both wet and dirty and smell like a pigpen!” Peter said.
    Peter took Lisa’s arm and pulled her out of the pigpen. He held her hand and walked her home.
    Peter’s face was long and sad. He wondered what Mama would say. When they walked in the house,
    Mama looked up from her laundry. Her eyes grew large and her mouth opened wide. Then she laughed.
    “You look and smell like two little pigs. Take off your dirty clothes. I have just enough water to wash
    the two of you. Your clothes are another matter. I will take care of those later.”
    When the children were clean, Mama put Lisa in her bed for a nap. Peter went outside to sit and
    think. How was he going to keep Lisa out of trouble?

    Questions: 

    1. In the first paragraph, what word helps the reader know the meaning of chores?
    A. wander
    B. curious
    C. look
    D. job

    2. Why do Mama’s eyes grow large and her mouth open wide?
    A. She was angry at the children.
    B. She saw Lisa in the clothes basket.
    C. She did not know who the children were.
    D. She saw the children covered with mud.

    3. Which word best describes Lisa?
    A. naughty
    B. honest
    C. helpful
    D. thoughtful

    4. Which pair of words are compound words?
    A. outside and laughed
    B. sunshine and pigpen
    C. laundry and pigpen
    D. shouting and following
    5. What is the main idea of the passage?
    A. Peter has a hard job watching his sister.
    B. Ms. Smith likes to raise pigs.
    C. Mama has a busy schedule.
    D. Many people raise pigs.


    Answers: 

    1. D
    2. D
    3. A
    4. B


    Example 2:
    My passions: wild animals

    Passage: 
    Wolves Home Again
    Good things have come from bringing wolves back to Yellowstone National Park. One good thing is
    the return of two kinds of trees, which grow only near streams. They had nearly disappeared since the
    wolves were gone. There was a reason for this.
    The wolves scare away elk, which are animals that eat trees growing out of the ground. Now elk avoid
    spending time near streams in the park. They have no place to run from wolves there. The trees that
    disappeared near streams now grow in the park.
    Yellowstone National Park, “America’s first national park,” is in the northwest part of Wyoming. It
    spreads into Idaho and Montana. It became a park in 1872. The park is beautiful and has many visitors.
    The land was a home for wolves for a long time.
    Wolves were common in the park at first. As time went on, the wolves began dying out. By 1926, no
    wolves could be found. People who lived near Yellowstone killed them because the wolves would eat the
    animals the people had raised to sell.
    In 1995, many people joined forces to bring back the wolves. They were people who cared about
    animals and the health of the land. At first, this was only a dream since there were no wolves in the park!
    Wolves were in Canada, which is north of the United States. People went to Canada to capture wolves.
    They brought them back to the park and let them go. They kept close track of the wolves’ actions. When
    a wolf died, they would figure out the reason. A lot was done to protect the wolves from harm.
    Yet, ranchers also complained that the wolves were eating their animals. In 1997, they tried to get rid
    of the wolves by passing a law to remove them from the park. The law was never passed.
    Now, there are many wolves in Yellowstone National Park. The land is healthier, and the wolves have
    their home back.

    Questions: 

    1. What is the singular form of the word wolves?
    A. wolf
    B. wolfs
    C. wolfes
    D. wolve

    2. What is the author informing the reader of in the passage?
    A. wolves living in Canada
    B. wolves bringing good things to Yellowstone National Park
    C. wolves eating elk and ranch animals
    D. wolves being hunted in Yellowstone National Park

    3. According to the passage, Yellowstone National Park is located in what three states?
    A. Wyoming, Idaho, and Montana
    B. Wyoming, Colorado, and Utah
    C. Wyoming, Nebraska, and Idaho
    D. Wyoming, Montana, and Colorado

    4. Why were wolves killed by people who lived near Yellowstone?
    A. They were eating the ranchers’ animals.
    B. Park visitors were hurt by them.
    C. They became sick and died.
    D. A law was passed to hunt them.

    Answers:
    1. A
    2. B
    3. A
    4. A


    My passion:
    '''

    streamWords = False

    if(not streamWords):
        if message:
            messages.append(
                {"role": "user", "content": message + passions},
            )
            chat = openai.ChatCompletion.create(
                model="gpt-3.5-turbo", messages=messages
            )
            reply = chat.choices[0].message.content
    else:
        messages.append(
                {"role": "user", "content": message + passions},
            )

        for chunk in openai.ChatCompletion.create(
            model="gpt-3.5-turbo",

            messages=messages,
            stream=True,
        ):
            content = chunk["choices"][0].get("delta", {}).get("content")
            if content is not None:
                for char in content:
                    print(char, end='', flush=True)
                    #print(char, end='', flush=True)
                    time.sleep(.05)


    passage = reply[reply.find("Passage") + 8:reply.find("Questions")]
    question = reply[reply.find("Questions") + 10:reply.find("Answers")]
    answers = reply[reply.find("Answers") + 8:]
    #print(question)
    questionArr = question.split('\n')
    while("" in questionArr):
        questionArr.remove("")


    q1 = questionArr[0:5]
    q2 = questionArr[5:10]
    q3 = questionArr[10:15]
    q4 = questionArr[15:20]

    questionArr = [q1,q2,q3,q4]

    letters = answers.splitlines()

    while("" in letters):
        letters.remove("")


    for i in range(len(letters)):
        letters[i] = letters[i][-1:]




    data = {}
    data['Passage'] = passage
    data["Question"] = questionArr
    data["Answers"] = letters
    data_clean(data,categories)
    with open('passage.txt', 'w') as f:
        f.write(str(data))
    return data
    #print(data)



generate("dancing", ["Inference", "Vocab", "Details", "Main Ideas"])
with open('passage.txt', 'r') as f:
        print(f.read())
