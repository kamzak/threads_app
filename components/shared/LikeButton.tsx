"use client";

import { toggleLikeThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  userId: string;
  threadId: string;
  likedBy: string[];
}

const LikeButton = ({ userId, threadId, likedBy }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const isLiked = likedBy?.length > 0 ? likedBy.includes(userId) : false;

  const toggleLikeHandler = async () => {
    await toggleLikeThread({ userId, threadId, path: pathname });
  };
  return (
    <Image
      src={isLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-cover"
      onClick={toggleLikeHandler}
    />
  );
};

export default LikeButton;
