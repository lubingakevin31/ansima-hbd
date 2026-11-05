/* ============================================================
   CONTENT — everything you may want to edit is in this file
   ============================================================ */
const CONTENT = {
  name: 'Ansima',
 
  /* Opening screen: typed from left to right while the photo blurs */
  splashLines: [
    'You are a special person.',
    'This is made for you: friend, reader, coder, musician… whatever you choose to be, you do it with quality.',
    'Ansima, we love you very much.'
  ],
 
  /* Surprise files.  Videos: assets/videos/a.mp4 … f.mp4   Audios: assets/audio/a.mp3 … j.mp3  (lowercase) */
  videos: 'abcdef',
  audios: 'abcdefghij',
 
  /* The game: 7 questions. type "choice" = options + answer (index), type "text" = answers (accepted words) */
  questions: [
    { type: 'choice', q: 'Which of these is a programming language?', options: ['Marble', 'Python', 'Falsetto', 'Sonnet'], answer: 1, hint: 'Think about code, not poems or music.' },
    { type: 'choice', q: 'How many different notes are in a major scale, before it repeats at the octave?', options: ['5', '7', '9', '12'], answer: 1, hint: 'Do, re, mi… keep counting.' },
    { type: 'choice', q: 'Who wrote the novel “Pride and Prejudice”?', options: ['Charlotte Brontë', 'Mary Shelley', 'Jane Austen', 'Emily Dickinson'], answer: 2, hint: 'Her novels are full of Mr Darcy.' },
    { type: 'choice', q: 'Which word means “happening once every year”?', options: ['Annual', 'Daily', 'Weekly', 'Hourly'], answer: 0, hint: 'Think of a birthday.' },
    { type: 'choice', q: 'I grow every year, you celebrate me with candles, and I am not a tree. What am I?', options: ['A volcano', 'A birthday', 'A Wi-Fi signal', 'A holiday'], answer: 1, hint: 'You are about to have one.' },
    { type: 'text', q: 'You can blow me out, but I am not the wind. I sit on top of the cake. What am I?', answers: ['candle', 'candles', 'a candle'], hint: 'One word. You light it before you make a wish.' },
    { type: 'choice', q: 'Final question. On which day do we celebrate Ansima?', options: ['5 October', '5 November', '15 November', '5 December'], answer: 1, hint: 'Look at the top of this page.' }
  ],
 
  /* Years section: a photo for each year, assets/images/2021.jpeg … 2026.jpeg */
  years: [
    { y: 2021, title: 'The girl you were', text: 'Quiet, curious, and already carrying a voice that made people stop and listen.' },
    { y: 2022, title: 'Finding your way', text: 'New paths, new places, new responsibilities. Not everything was easy. You kept going.' },
    { y: 2023, title: 'Learning', text: 'Every page you read, every line of code, every note you sang. It all added up.' },
    { y: 2024, title: 'Growing', text: 'Stronger than you thought, softer than you let on.' },
    { y: 2025, title: 'Becoming', text: 'Little by little, you turned into the person you meant to be.' },
    { y: 2026, title: 'Here you are', text: 'Look how far you have come.' }
  ],
  yearsQuote: 'One is not born, but rather becomes, a woman.',
  yearsQuoteBy: 'Simone de Beauvoir',
  yearsEnd: 'You are becoming her.',
 
  /* The book. Use **double stars** around words you want in bold. One string = one paragraph.
     Both languages must have the same number of paragraphs. */
  book: {
    title: 'Ansima',
    subtitle: 'A story for your birthday',
    dedication: 'For Ansima\n5 November 2026',
    end: 'The end',
    en: [
      '**Life has its own illusions. Life has its own dreams. Life has its own sorrows, but also its own joys.**',
      'We sometimes think we will stay the same forever. Yet, with time, we end up changing. And one day, we wonder whether the person we once were still exists somewhere inside us, or whether she has vanished completely to make room for someone else.',
      'One day, I realized that I could move forward. I didn’t really know the person you were, but with time, I came to discover who you truly were.',
      'In my final year of secondary school, I met a girl. **Her name was Ansima.**',
      'At the beginning of the year, we hardly spoke. She was too shy; I was too talkative and far too busy in my own little world. But I think that period lasted only two months. Then we started talking and, little by little, life seemed to take on another colour.',
      'That was when I discovered her voice.',
      '**An angelic voice.** A voice so beautiful that, sometimes, words seemed not enough to describe it. I used to tell myself that if God had needed a voice to make the angels sing, He might have chosen hers. He would have placed it above all the others, simply to hear it sing again and again.',
      'Yes, her voice was that beautiful. Wow… We were almost lost for words.',
      'There was also a friend called Regan. He listened to her too. And the two of us were completely hooked on that voice. It was something!',
      'When I think back, life was so beautiful.',
      'There was also a small detail I appreciated: she knew English, unlike me. There were things she had mastered that I didn’t know, things she succeeded at where I still had a lot to learn. And that was interesting. Because, deep down, meeting someone is also a chance to discover things you didn’t know.',
      'Then we all sat our baccalaureate exams.',
      'Unfortunately, some people are not meant to stay in the same place forever. Life moves us, sometimes separates us, and leads each of us down a different path.',
      'And so we left. I left too.',
      'At that time, we didn’t talk much. Everyone was busy with their own affairs, their own responsibilities and their new life.',
      'But, strangely, things picked up again.',
      'We started talking again. It has been, I think, a month, two months, maybe two and a half or even three months now. I can no longer say exactly. But what I do know is that this reunion has something interesting about it.',
      'It was during this period, in fact, that I decided to pin her on WhatsApp. Why? Because I told myself it would be nice to see her name appear every day and, perhaps, to wait for a message from her. **There are people whose presence you simply come to appreciate, even through a small screen.**',
      'Lately, I haven’t written to her much. And there was a reason for that: I was preparing something for her birthday. Above all, I didn’t want her to find out about the surprise before the right moment.',
      'So I pretended not to write to her too much.',
      'Yet, in secret, I went onto her TikTok almost every day to see what she had posted. I wanted to know what she was doing, what she was sharing, to discover a small piece of her daily life.',
      'And she is interesting. Truly interesting.',
      'I think that if more people took the time to get to know her, they would understand what I mean. The world is already full of different people, but some have a particular way of giving it another flavour.',
      '**And she, in her own way, gives this world a very good taste.**',
      'Since she became my friend, I have discovered a person whose presence deserves to be appreciated. And today, I simply want to wish her a happy birthday.',
      'May life be kind to her. May she move forward, may she grow, may she discover beautiful things and may she never lose what makes her unique. May God walk with her and give her many more reasons to smile.',
      '**Happy birthday, Ansima!**',
      'And if there is one thing this story reminds me of, it is that we must choose carefully the people around us. Because we never know what tomorrow holds. It is better to have beside you people whose presence brings something good to your life.',
      '**Life is a garden.** There are always flowers, different flowers, some rarer than others, some that catch the eye at once.',
      'But, deep down, what matters most is not whether a flower is rare or not.',
      'What matters most is the time we gave to that flower, the care we brought to it, the patience we showed in watching it grow and all the effort we made to make it more beautiful.',
      '**For a flower does not become precious only because it is rare.**',
      '**Sometimes, it is simply the time we have spent beside it that makes it irreplaceable.**'
    ],
    fr: [
      '**La vie a ses propres illusions. La vie a ses propres rêves. La vie a ses propres peines, mais aussi ses propres bonheurs.**',
      'On pense parfois qu’on restera les mêmes pour toujours. Pourtant, avec le temps, on finit par se transformer. Et un jour, on se demande si la personne que nous étions autrefois existe encore quelque part en nous, ou si elle a complètement disparu pour laisser place à quelqu’un d’autre.',
      'Un jour, j’ai découvert que je pouvais avancer. Je ne connaissais pas vraiment la personne que tu étais, mais avec le temps, j’ai fini par découvrir qui tu étais réellement.',
      'En sixième secondaire, j’ai rencontré une fille. **Elle s’appelait Ansima.**',
      'Au début de l’année, nous ne nous parlions presque pas. Elle était trop timide, moi, j’étais trop bavard et beaucoup trop occupé dans mon petit monde. Mais je pense que cette période n’a duré que deux mois. Ensuite, nous avons commencé à discuter et, petit à petit, la vie semblait prendre une autre couleur.',
      'C’est à ce moment-là que j’ai découvert sa voix.',
      '**Une voix angélique.** Une voix tellement belle que, parfois, les mots semblaient insuffisants pour la décrire. Je me disais que si Dieu avait eu besoin d’une voix pour faire chanter les anges, il aurait peut-être choisi la sienne. Il l’aurait placée au-dessus de tous les autres, simplement pour l’écouter chanter encore et encore.',
      'Oui, sa voix était aussi belle que ça. Waouh… Il nous arrivait presque de manquer de mots.',
      'Il y avait aussi un pote qui s’appelait Regan. Lui aussi l’écoutait. Et tous les deux, nous étions complètement accros à cette voix. C’était quelque chose !',
      'Quand j’y repense, la vie était tellement belle.',
      'Il y avait aussi cette petite particularité que j’appréciais : elle connaissait l’anglais, contrairement à moi. Il y avait des choses qu’elle maîtrisait et que je ne connaissais pas, des choses qu’elle réussissait là où, moi, j’avais encore beaucoup à apprendre. Et c’était intéressant. Parce qu’au fond, rencontrer quelqu’un, c’est aussi avoir l’occasion de découvrir des choses que l’on ne connaissait pas.',
      'Puis, nous avons tous passé notre baccalauréat.',
      'Malheureusement, certaines personnes ne sont pas destinées à rester éternellement au même endroit. La vie nous déplace, nous sépare parfois et nous conduit chacun vers des chemins différents.',
      'C’est ainsi que nous sommes partis. Moi aussi, je suis parti.',
      'À cette époque, nous ne nous parlions pas tellement. Chacun était occupé par ses propres affaires, ses propres responsabilités et sa nouvelle vie.',
      'Mais, bizarrement, les choses ont repris.',
      'Nous avons recommencé à discuter. Cela fait aujourd’hui, je pense, un mois, deux mois, peut-être deux mois et demi ou même trois mois. Je ne saurais plus exactement le dire. Mais ce que je sais, c’est que ces retrouvailles ont quelque chose d’intéressant.',
      'C’est d’ailleurs pendant cette période que j’ai décidé de l’épingler sur WhatsApp. Pourquoi ? Parce que je m’étais dit qu’il serait agréable de voir son nom apparaître chaque jour et, peut-être, d’attendre un message de sa part. **Il y a des personnes dont on finit par apprécier simplement la présence, même à travers un petit écran.**',
      'Ces derniers temps, je ne lui ai pas beaucoup écrit. Et il y avait une raison à cela : je préparais quelque chose pour son anniversaire. Je ne voulais surtout pas qu’elle découvre la surprise avant le moment venu.',
      'Alors, je faisais semblant de ne pas trop lui écrire.',
      'Pourtant, en secret, je passais presque tous les jours sur son TikTok pour voir ce qu’elle avait publié. Je voulais savoir ce qu’elle faisait, ce qu’elle partageait, découvrir un petit morceau de son quotidien.',
      'Et elle est intéressante. Vraiment intéressante.',
      'Je pense que si davantage de personnes prenaient le temps de la découvrir, elles comprendraient ce que je veux dire. Le monde est déjà rempli de personnes différentes, mais certaines ont cette manière particulière de lui donner une autre saveur.',
      '**Et elle, à sa manière, donne un très bon goût à ce monde.**',
      'Depuis qu’elle est devenue mon amie, j’ai découvert une personne dont la présence mérite d’être appréciée. Et aujourd’hui, je voudrais simplement lui souhaiter un joyeux anniversaire.',
      'Que la vie lui soit favorable. Qu’elle avance, qu’elle grandisse, qu’elle découvre de belles choses et qu’elle ne perde jamais ce qui fait sa particularité. Que Dieu accompagne ses pas et lui accorde encore de nombreuses raisons de sourire.',
      '**Joyeux anniversaire, Ansima !**',
      'Et s’il y a une chose que cette histoire me rappelle, c’est qu’il faut bien choisir les personnes qui nous entourent. Parce qu’on ne sait jamais ce que demain nous réserve. Il vaut mieux avoir à ses côtés des personnes dont la présence apporte quelque chose de bon à notre existence.',
      '**La vie est un jardin.** Il y a toujours des fleurs, des fleurs différentes, certaines plus rares que d’autres, certaines qui attirent immédiatement le regard.',
      'Mais, au fond, le plus important n’est pas de savoir si une fleur est rare ou non.',
      'Le plus important, c’est le temps que nous avons consacré à cette fleur, les soins que nous lui avons apportés, la patience dont nous avons fait preuve pour la voir grandir et tous les efforts que nous avons fournis pour l’embellir.',
      '**Car une fleur ne devient pas précieuse uniquement parce qu’elle est rare.**',
      '**Parfois, c’est simplement le temps que nous avons passé auprès d’elle qui la rend irremplaçable.**'
    ]
  },
 
  /* Closing note on the last section */
  closing: 'May this new year bring you sincere reasons to laugh, people who take care of you, courage for your dreams, and memories you will still be telling for a long time. You deserve a day as bright as the energy you bring to the people around you. May God keep you, guide you, and give you peace, health and plenty of love.'
};
 
