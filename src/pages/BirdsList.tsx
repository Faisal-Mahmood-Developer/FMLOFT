import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const BirdsList = () => {
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(true);

//  useEffect(() => {
//   const fetchBirds = async () => {
//     try {
//       // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
//       const API_URL = import.meta.env.VITE_API_URL;

//       const res = await fetch(`${API_URL}/api/pigeons`);
//       const data = await res.json();

//       setBirds(data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching birds:", err);
//       setLoading(false);
//     }
//   };

//   fetchBirds();
// }, []);

useEffect(() => {
  const fetchBirds = async () => {
    try {
      const q = query(
        collection(db, "pigeons"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const birdsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBirds(birdsData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  fetchBirds();
}, []);

  if (loading)
    return (
      <Layout>
        <p className="p-8 text-center">Loading...</p>
      </Layout>
    );

  if (!birds.length)
    return (
      <Layout>
        <p className="p-8 text-center">No birds found</p>
      </Layout>
    );

  // ✅ Get latest race from pigeonRaces
  const getLatestRaces = (pigeonRaces) => {
    if (!pigeonRaces) return { year: null, races: [] };

    const years = Object.keys(pigeonRaces).sort();
    const latestYear = years.pop();

    if (!latestYear) return { year: null, races: [] };

    const races = pigeonRaces[latestYear];

    return { year: latestYear, races };
  };

  return (
    <Layout>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl mb-6">All Birds</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {birds.map((bird) => {
            const { year, races } = getLatestRaces(
              bird.pigeonRaces
            );

            return (
              <div
                key={bird.id}
                className="border p-4 rounded shadow space-y-2"
              >
                {/* Bird Info */}
                <p className="font-bold">
                  {bird.name}
                  <span className="text-sm font-normal ml-2">
                    (Ring No: {bird.ring})
                  </span>
                </p>

                <p className="text-sm">Race Result</p>

                {/* Mini Race Table */}
                {races?.length > 0 && (
                  <table className="w-full text-center border text-sm mt-2">
                    <thead>
                      <tr className="bg-primary text-black">
                        <th className="border p-1">Year</th>
                        <th className="border p-1">KM</th>
                        <th className="border p-1">Pos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {races.map((r, i) => (
                        <tr key={i}>
                          <td className="border p-1">{year}</td>
                          <td className="border p-1">{r.km}</td>
                          <td className="border p-1">
                            {r.position}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Link */}
                <Link
                  to={`/pedigree/${bird.ring}`}
                  className="text-primary text-sm mt-2 block"
                >
                  View Pedigree →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default BirdsList;