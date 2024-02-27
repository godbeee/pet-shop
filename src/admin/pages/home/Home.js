import Card from "../../../components/UI/Card";
import InfoBoard from "./components/InfoBoard/InfoBoard";

function Home() {
  return (
    <>
      <div className="p-3">
        <Card className={"p-4"}>
          <div>
            <h3>DashBoard management</h3>
          </div>
        </Card>
        <InfoBoard />
      </div>
    </>
  );
}

export default Home;
