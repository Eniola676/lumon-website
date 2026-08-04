export type MuxVideoReview = {
  name: string;
  role: string;
  avatar?: string;
  videoUrl: string;
  poster: string;
  text?: string;
  rating: number;
};

export type TextReview = {
  name: string;
  platform: string;
  text: string;
  rating: number;
};

function muxPoster(videoUrl: string): string {
  const id = videoUrl.split("stream.mux.com/")[1]?.split("/")[0];
  return `https://image.mux.com/${id}/thumbnail.jpg?time=0`;
}

const muxUrl = (id: string) => `https://stream.mux.com/${id}/low.mp4`;

export const MUX_VIDEO_REVIEWS: MuxVideoReview[] = [
  {
    name: "Dr. Shawn Boyd",
    role: "Educator",
    avatar:
      "https://senja-io.s3.us-west-1.amazonaws.com/public/media/ae0d4419-f106-4ae2-b3a7-b1c198ae8941_95ae00a8-7f42-4d64-9dbd-7de1ea441c14_download.jpeg",
    videoUrl: muxUrl("Wag87clSMdue5IuPdUATHj02BfOCh02UUmELrZoTn2Ktk"),
    poster: muxPoster(muxUrl("Wag87clSMdue5IuPdUATHj02BfOCh02UUmELrZoTn2Ktk")),
    rating: 5,
  },
  {
    name: "Dr. C. Una Eatman",
    role: "Founder of HBCU Pa'lante",
    videoUrl: muxUrl("sfcIvKwiyp6c5wCeApLvbghAFVDhgTP5zyebaYy1xWU"),
    poster: muxPoster(muxUrl("sfcIvKwiyp6c5wCeApLvbghAFVDhgTP5zyebaYy1xWU")),
    text: "It was outstanding. Everything was delivered to spec and in the timeframe indicated. I'm super happy that I hired Tobi and will definitely use him and recommend him to my peers!",
    rating: 5,
  },
  {
    name: "Brian Jacobs",
    role: "CEO of In The Zone",
    avatar:
      "https://senja-io.s3.us-west-1.amazonaws.com/public/media/6f9b5b96-12f9-46d2-bfaf-ece1ab2c0656_4d64b884-51ba-4660-81a1-3aba9cb46418_Brian.jpeg",
    videoUrl: muxUrl("wi0202Vmd02nxVGVI9HwOgoFBrtK98ePUqGSlfAk6ToDS00"),
    poster: muxPoster(muxUrl("wi0202Vmd02nxVGVI9HwOgoFBrtK98ePUqGSlfAk6ToDS00")),
    text: "He knows exactly how to make everything clear and professional....",
    rating: 5,
  },
  {
    name: "Daniel Bove",
    role: "NBA Strength Coach",
    avatar:
      "https://senja-io.s3.us-west-1.amazonaws.com/public/media/f96c9f87-4af2-4784-9903-18bd0c4bdab2_fefb7d40-2fab-4b3a-ac8b-8d063a0c92a6_daniel.webp",
    videoUrl: muxUrl("T8RUlbwIhUTGFYa5BR02ywuEpK3zYMh6rzTLIA9a6KyM"),
    poster: muxPoster(muxUrl("T8RUlbwIhUTGFYa5BR02ywuEpK3zYMh6rzTLIA9a6KyM")),
    text: "He is the best...",
    rating: 5,
  },
];

export const TEXT_REVIEWS: TextReview[] = [
  {
    name: "christacourt",
    platform: "Fiverr",
    rating: 5,
    text: "Tobi Ojet did an excellent job on our website development project, demonstrating a high level of professionalism and exceptional work quality. His cooperation and deep understanding throughout the process made working with him a seamless experience. Highly recommend him for anyone in need of top-notch website development services!",
  },
  {
    name: "sworkz",
    platform: "Fiverr",
    rating: 5,
    text: "Tobi Ojet has truly outdone himself with an exceptional quality of delivery. His code expertise and professionalism raise the bar! 🤩 It's rare to find someone who not only meets but exceeds expectations in both the product and communication. His proactive, polite approach makes every project a breeze. Once again, Toby has blown me away with his grasp of the project's needs, solidifying his place as my go-to website editor. A must-hire for sure!",
  },
  {
    name: "melissanyarko",
    platform: "Fiverr",
    rating: 5,
    text: "Tobi is great to work with. Came to him with a rough idea and a rough sketch and he really turned it out into an elegant webpage that exceeded my expectations. I will definitely keep Toby in mind for future digital projects. Thanks again, Toby!",
  },
  {
    name: "tatecopywriting",
    platform: "Fiverr",
    rating: 5,
    text: "Tobi was great to work with. He spent a lot of time and effort making the website look just the way I wanted. He was also open to all the feedback and made quick corrections. Thanks again Toby!",
  },
  {
    name: "canelauna",
    platform: "Fiverr",
    rating: 5,
    text: "Tobi was excellent. He offered ideas when I was stuck, took initiative, and was extremely patient as I had to ask for several extensions due to life's emergencies. He's extremely professional and knows how bring your ides to life! I would recommend him to anyone.",
  },
  {
    name: "petewc",
    platform: "Fiverr",
    rating: 5,
    text: "Tobi was super responsive from beginning to end of the project, completing the work well ahead of schedule and expectations. I will definitely be using his services in the future and would highly recommend him to anyone needing support with Kajabi or simply wanting to cut through trying to figure stuff out on their own.",
  },
  {
    name: "soshikanlu",
    platform: "Fiverr",
    rating: 5,
    text: "Working with Tobi is a SWEET experience. He is knowledgeable, flexible, and goes the extra mile. I had a problem with the first company I choose and he advised we go elsewhere with no fuss and now my course is up and running. He is now part of my 'virtual' team! Thank you Toby for repping us well!\nIf you want your course launched with no drama? Go to Toby!",
  },
  {
    name: "coach1tash",
    platform: "Fiverr",
    rating: 5,
    text: "I came into this project knowing that I just wanted to start. With that being said I did not provide a lot of information. Still, we worked well together to make my vision become a reality. Thank you for your help.",
  },
  {
    name: "ferdifred",
    platform: "Fiverr",
    rating: 5,
    text: "I had the pleasure of working with Tobi to create an online course and found him to be an excellent professional with great ideas. His attention to detail and clear communication made the process seamless. I highly recommend him to anyone looking for a dedicated and talented freelancer. Thank you Toby",
  },
  {
    name: "coryschlesinger",
    platform: "Fiverr",
    rating: 5,
    text: "Tobi and his team went above and beyond!\n\nMy course launched with great success and I owe it to Tobi's hard work and dedication.\n\nWill use again!",
  },
  {
    name: "diegocassina",
    platform: "Fiverr",
    rating: 5,
    text: "It was outstanding. Everything was delivered to spec and in the timeframe indicated. I'm super happy that I hired Tobi and will definitely use and recommend him to my peers!",
  },
];
