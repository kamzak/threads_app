import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import UserCard from "../cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";

async function RightSidebar() {
  const user = await currentUser();
  // if (!user) return null;

  // Fetch communities
  const suggestedCommunities = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 4,
  });

  // Fetch users
  const suggestedUsers = await fetchUsers({
    userId: user?.id || '',
    searchString: "",
    pageNumber: 1,
    pageSize: 4,
  });

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communites
        </h3>

        <div className="mt-7 flex flex-col gap-9">
          {suggestedCommunities.communities.length === 0 ? (
            <p className="no-result">No communities</p>
          ) : (
            <>
              {suggestedCommunities.communities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType="Community"
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Similar Minds</h3>

        <div className="mt-7 flex flex-col gap-9">
          {suggestedUsers.users.length === 0 ? (
            <p className="no-result">No users</p>
          ) : (
            <>
              {suggestedUsers.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
