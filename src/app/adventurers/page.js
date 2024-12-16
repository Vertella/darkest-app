import { fetchAdventurers } from "../utils/fetcher";
import AdventurerCard from "../components/AdventurerCard";
import Navbar from "../components/NavBar";

export default async function AdventurersPage() {
  const adventurers = await fetchAdventurers();

  if (!Array.isArray(adventurers)) {
    return <div>Error: Data is not available</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="bg-gray-800 text-white p-4">
              
        <Navbar />
      </header>

      <main className="flex-grow container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adventurers.length === 0 ? (
            <div>No adventurers found.</div>
          ) : (
            adventurers.map((adventurer) => (
              <AdventurerCard key={adventurer.id} adventurer={adventurer} />
            ))
          )}
        </div>
      </main>
    </div>
  );
  console.log(heroes);
}
