import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "../shared/LikeButton";

interface Props {
  id: string;
  currentUserId: string;
  currentUserInfoId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
    parent: {
      community: { image: string };
    };
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  communityDetails?: {
    image?: string;
    name?: string;
  };
  likes: number;
  likedBy: string[];
}

const ThreadCard = ({
  id,
  currentUserId,
  currentUserInfoId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likes,
  likedBy,
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start juistify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`}>
              <Image
                src={author.image}
                alt="Profile image"
                height={48}
                width={48}
                className="cursor-pointer rounded-full object-cover h-[48px] w-[48px] max-w-[48px] max-h-[48px]"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-6"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <LikeButton
                  userId={currentUserInfoId}
                  threadId={id}
                  likedBy={likedBy}
                />

                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-cover"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-cover"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-cover"
                />
              </div>

              {comments.length > 0 && (
                <div className="flex items-center">
                  {comments.map((comment, index) => (
                    <Image
                      key={index}
                      src={comment.author.image}
                      alt={`user_${index}`}
                      width={20}
                      height={20}
                      className={`${
                        index !== 0 && "-ml-2"
                      } rounded-full object-cover h-[20px] w-[20px] max-w-[20px] max-h-[20px]`}
                    />
                  ))}
                  {comments.length > 3 && (
                    <p className="ml-1 text-subtle-medium text-gray-1">
                      +{comments.length} users{" "}
                      <span className="ml-1">&#183;</span>
                    </p>
                  )}
                  {comments.length > 0 && (
                    <Link href={`/thread/${id}`}>
                      <p className="ml-2 text-subtle-medium text-gray-1">
                        {" "}
                        {comments.length}{" "}
                        {comments.length === 1 ? "reply" : "replies"}
                      </p>
                    </Link>
                  )}
                </div>
              )}
              {likes ? (
                <p className="text-subtle-medium text-gray-1">
                  {likes} {likes === 1 ? "like" : "likes"}
                </p>
              ) : null}

              {!community && (
                <p className="text-subtle-medium text-gray-1">
                  {formatDateString(createdAt)}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* TODO: Delete thread */}
      </div>
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community?.name} Community
          </p>

          <Image
            src={community?.image}
            alt={community?.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover h-[14px] w-[14px]"
          />
        </Link>
      )}
    </article>
  );
};

export default ThreadCard;
