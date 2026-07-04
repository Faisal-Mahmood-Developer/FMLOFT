import Layout from "@/components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Pedigree = () => {
  const { ring } = useParams();
  const navigate = useNavigate();

  const [pigeon, setPigeon] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // FETCH DATA
  // ===============================
// useEffect(() => {
//   const fetchPigeon = async () => {
//     try {
//       // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
//       const API_URL = import.meta.env.VITE_API_URL;

//       const res = await fetch(`${API_URL}/api/pigeons/${ring}`);

//       if (!res.ok) throw new Error("Pigeon not found");

//       const data = await res.json();
//       setPigeon(data);
//     } catch (err) {
//       console.error(err);
//       setPigeon(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchPigeon();
// }, [ring]);

useEffect(() => {
  const fetchPigeon = async () => {
    try {
      const q = query(
        collection(db, "pigeons"),
        where("ring", "==", ring)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setPigeon(null);
      } else {
        setPigeon({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setPigeon(null);
    } finally {
      setLoading(false);
    }
  };

  fetchPigeon();
}, [ring]);

  // ===============================
  // RACES TABLE (UPDATED UI)
  // ===============================
  const renderRaces = (title, raceMap, name, ring) => {
    if (!raceMap || Object.keys(raceMap).length === 0) return null;

    return (
      <div className="bg-gray-900 p-5 rounded-xl shadow border border-gray-800">

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-primary">
          {title} Race Results
        </h3>

        {/* NAME + RING */}
        <p className="text-sm text-gray-400 mb-4">
          🐦 {name || "-"} | Ring:{" "}
          <span className="text-white">{ring || "-"}</span>
        </p>

        {Object.entries(raceMap).map(([year, races]) => (
          <div key={year} className="mb-4">
            <p className="text-primary mb-2">{year}</p>

            <table className="w-full text-center text-sm border border-gray-700 rounded overflow-hidden">
              <thead>
                <tr className="bg-primary text-black">
                  <th className="p-2">KM</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Position</th>
                </tr>
              </thead>

              <tbody>
                {races.map((r, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="p-2">{r.km}</td>
                    <td className="p-2">{r.date}</td>
                    <td className="p-2 font-semibold text-yellow-300">
                      {r.position}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };
  // ===============================
  // STATES
  // ===============================
  if (loading)
    return (
      <Layout>
        <p className="p-8 text-center text-white">Loading...</p>
      </Layout>
    );

  if (!pigeon)
    return (
      <Layout>
        <p className="p-8 text-center text-white">No Data Found</p>
      </Layout>
    );

  // ===============================
  // UI
  // ===============================
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8 text-white">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/birds")}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 hover:opacity-80 transition"
        >
          ← Back
        </button>

        {/* MAIN PROFILE */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-xl border border-gray-800 text-center">
          <h2 className="text-3xl font-bold text-primary">
            {pigeon.name}
          </h2>

          <p className="mt-2 text-gray-400">
            Ring: <span className="text-white">{pigeon.ring}</span>
          </p>

          <div className="flex justify-center gap-6 mt-4 text-sm">
            <p>
              Gender:{" "}
              <span className="text-primary">
                {pigeon.gender}
              </span>
            </p>
            <p>
              Color:{" "}
              <span className="text-primary">
                {pigeon.color || "-"}
              </span>
            </p>
          </div>

          <p className="mt-3 italic text-primary">
            {pigeon.strain || "-"}
          </p>
        </div>

        {/* PARENTS */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-5 rounded-xl shadow border border-gray-800 text-center hover:scale-[1.02] transition">
            <p className="text-primary font-semibold mb-2">
              Father
            </p>
            <p className="text-lg">
              {pigeon.father || "-"}
            </p>
          </div>

          <div className="bg-gray-900 p-5 rounded-xl shadow border border-gray-800 text-center hover:scale-[1.02] transition">
            <p className="text-primary font-semibold mb-2">
              Mother
            </p>
            <p className="text-lg">
              {pigeon.mother || "-"}
            </p>
          </div>
        </div>

        {/* GRANDPARENTS */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-5 rounded-xl shadow border border-gray-800">
            <p className="text-primary font-semibold mb-3 text-center">
              Paternal Parents
            </p>
            <div className="flex justify-center gap-6 text-primary">
              <div className="text-primary text-center">
                <p>Grand Father:</p>
                <p className="text-white ">{pigeon.paternalGrandfather || "-"}</p>
              </div>
              <div className="text-primary text-center">
                <p>Grand Mother:</p>
                <p className="text-white">{pigeon.paternalGrandmother || "-"}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-5 rounded-xl shadow border border-gray-800">
            <p className="text-primary font-semibold mb-3 text-center">
              Maternal Parents
            </p>
            <div className="flex justify-center gap-6 text-primary">

              <div className="text-primary text-center">
                <p>Grand Father:</p>
                <p className="text-white">{pigeon.maternalGrandfather || "-"}</p>
              </div>

              <div className="text-primary text-center">
                <p>Grand Mother:</p>
                <p className="text-white">{pigeon.maternalGrandmother || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RACE RESULTS */}
        <div className="space-y-6">
          {renderRaces("Pigeon", pigeon.pigeonRaces, pigeon.name, pigeon.ring)}

          {renderRaces("Father", pigeon.fatherRaces, pigeon.father, pigeon.fatherRing)}

          {renderRaces("Mother", pigeon.motherRaces, pigeon.mother, pigeon.motherRing)}

          {renderRaces(
            "Paternal Grandfather",
            pigeon.paternalGrandfatherRaces,
            pigeon.paternalGrandfather,
            pigeon.paternalGrandfatherRing
          )}

          {renderRaces(
            "Paternal Grandmother",
            pigeon.paternalGrandmotherRaces,
            pigeon.paternalGrandmother,
            pigeon.paternalGrandmotherRing
          )}

          {renderRaces(
            "Maternal Grandfather",
            pigeon.maternalGrandfatherRaces,
            pigeon.maternalGrandfather,
            pigeon.maternalGrandfatherRing
          )}

          {renderRaces(
            "Maternal Grandmother",
            pigeon.maternalGrandmotherRaces,
            pigeon.maternalGrandmother,
            pigeon.maternalGrandmotherRing
          )}
        </div>

      </div>
    </Layout>
  );
};

export default Pedigree;