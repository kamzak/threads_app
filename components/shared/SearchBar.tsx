import Image from "next/image";
import { Input } from "../ui/input";

interface Props {
  name: string;
}

const SearchBar = ({ name }: Props) => {
  return (
    <div className="relative">
      <Image
        src={"/assets/search-gray.svg"}
        alt="Search icon"
        width={24}
        height={24}
        className="absolute top-4 left-4"
      />
      <Input
        placeholder={`Search ${name}`}
        className="bg-dark-4 text-light-1 border-none h-14 w-full px-14"
      />
    </div>
  );
};

export default SearchBar;
