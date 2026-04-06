export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  lang: "en" | "ar";
  /** English translation — only needed for Arabic reviews */
  translation?: string;
}

export const reviews: Review[] = [
  {
    name: "Arshad Khan",
    rating: 5,
    date: "a year ago",
    text: "I contacted them for my treadmill service, and I am quite satisfied. The service team was very professional — they responded quickly and understood the issue. The technician did a thorough inspection, repaired it efficiently, and everything is working perfectly now. Excellent quality of work, and they replaced all the damaged parts. They kept me updated at every step. I would definitely recommend them for any treadmill-related issues.",
    lang: "en",
  },
  {
    name: "Husain Almuslim",
    rating: 5,
    date: "3 years ago",
    text: "Excellent service and Mr Ahmed is experienced. I needed to replace belt in treadmill. He showed me the belt he will use so I confidently agreed. He arranged for pick up from the house at reasonable extra charge. Today, he delivered the treadmill with high quality repair and short time as agreed.",
    lang: "en",
  },
  {
    name: "روز الشرقية ROOSE SHRGIH",
    rating: 5,
    date: "a year ago",
    text: "والله لا اعرف المحل و لا شي ، لكن كنت متخوف من التعليقات فتوكلت على الله و قلت اصلح عنده ، الموظف طفيل رجل ماشاء الله يسعده صلح الموظف اللي عنده جهاز السير حقي و رجع جديد ، صراحة استغرب من كتابة بعض الردود بحق الرجال",
    translation: "Honestly I didn't know this shop at all, but I was scared by some negative comments. I trusted God and went to get it repaired. The employee Tufail is a great man, mashallah — the technician who repaired my treadmill brought it back like new. I'm honestly surprised some people write bad comments about this man.",
    lang: "ar",
  },
  {
    name: "S S",
    rating: 5,
    date: "a year ago",
    text: "شغلهم رائع جداً اشكركم لحسن التعامل وسرعة التجاوب والانجاز 👍🏻 عشرة على عشرة",
    translation: "Their work is amazing. Thank you for the great treatment, quick response, and fast delivery. 👍🏻 Ten out of ten!",
    lang: "ar",
  },
  {
    name: "MISHAL Alwaleedi",
    rating: 5,
    date: "a year ago",
    text: "العامل الطفيل احمد مميز وسعره مقبول صلح لي السير ورجع جديد انصح فيه",
    translation: "The employee Tufail Ahmed is outstanding and his prices are fair. He repaired my treadmill and it came back like new. I highly recommend him.",
    lang: "ar",
  },
  {
    name: "AHMED ABDULLAHA",
    rating: 5,
    date: "a year ago",
    text: "العامل ممتاز تعامله كويس جيت من الحساء وما قصر",
    translation: "The employee is excellent — great attitude. I came from Al-Ahsa and he didn't let me down.",
    lang: "ar",
  },
  {
    name: "Fadhel Al Hashem",
    rating: 5,
    date: "3 years ago",
    text: "الصراحة شغل احترافي وسريع. من وقت اللي كلمت فيه المهندس احمد الى تصليح سير الجري ما اخذ ساعتين. بس كلمته جاني جاهز مع قطع الغيار. يعني بس شرحت المشكلة بالتلفون عرف حلها ماشاء الله تبارك الرحمن. شكرا جزيلًا",
    translation: "Honestly, professional and fast work. From the moment I called Engineer Ahmed to repairing the treadmill belt, it didn't even take two hours. I just called him and he came ready with spare parts. I just explained the problem on the phone and he already knew how to fix it, mashallah tabarak al-rahman. Thank you very much.",
    lang: "ar",
  },
  {
    name: "Buthina AlDossary",
    rating: 5,
    date: "2 years ago",
    text: "فقط تواصلت معهم هاتفياً وكان مرحب الموظف وشرح لي كيف التصليح وطلب مني ارسل الموقع واصور ماركة الجهاز علشان يجي للبيت ويفحصه",
    translation: "I only contacted them by phone and the employee was very welcoming — he explained how the repair works and asked me to send the location and a photo of the machine brand so he could come to the house and inspect it.",
    lang: "ar",
  },
];
