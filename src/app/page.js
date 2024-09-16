import Adventurers from "./adventurers/page";
import Navbar from "./components/NavBar";
import PartyPlanner from "./partyplanner/page";

export default function Home() {
  return (
    <div>
      <PartyPlanner />
      <Adventurers />
    </div>
  );
}
