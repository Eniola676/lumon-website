export type Testimonial = {
  mediaId: string;
  aspect: number;
  transcript: string;
};

export const TESTIMONIALS = {
  thinkificWebsite: {
    mediaId: "t2lh2tsgbm",
    aspect: 0.75,
    transcript:
      "So just wanted to stop by and let you know that Toby has done excellent work for me. He helped me with my website in addition to adding different modules to my Thinkific course. And any questions that I ever have, Toby is so willing and able to answer them. This professional relationship that we have has worked tremendously for me, and I've learned a lot. So if you're looking for somebody to do anything of the like, Toby's your guy.",
  },
  ecommerceCourse: {
    mediaId: "fl045ewwc4",
    aspect: 0.5625,
    transcript:
      "What's up, everybody? Anyone out there who's looking to start an online course of some sort, I would highly recommend you choose Toby as your developer. Over the past few months, I've actually worked with Toby on two projects. He has done an outstanding job. I plan on using him in the future. He's super responsive. He does high quality work, and he's really taken my ecommerce game to the next level. So if you're looking to start an online course, use Toby. You won't be disappointed.",
  },
  repeatClient: {
    mediaId: "7akhs7q1ju",
    aspect: 1.6666666666666667,
    transcript:
      "Hello. I wanna make sure to come in and just tell you if you're thinking about using someone to create your online course, make sure you use my guy, Toby. This is my third time using him. And when I say he always exceeds my expectations from course design, thought partnership, to being way ahead of the schedule, this is my go to. He makes my life so much easier. I highly recommend him. Use him.",
  },
} satisfies Record<string, Testimonial>;
