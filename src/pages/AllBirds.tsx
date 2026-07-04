import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";



const MyBirds = () => {
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // =========================
  // FETCH ALL DATA
  // =========================
  useEffect(() => {
    fetchBirds();
  }, []);

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
  } catch (err) {
    console.error("Fetch Error:", err);
  } finally {
    setLoading(false);
  }
};

  // =========================
  // DELETE
  // =========================
 const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure?");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "pigeons", id));
    fetchBirds();
  } catch (err) {
    console.error("Delete Error:", err);
  }
};

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <Layout>
        <p className="p-8 text-center text-white">Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">

        <h1 className="text-2xl font-semibold mb-6 text-white">
          All Birds Records
        </h1>

        <div className="overflow-auto">
          <table className="w-full text-center border border-gray-700 text-white">

            <thead>
              <tr className="bg-primary text-black">
                <th className="p-2">Name</th>
                <th className="p-2">Ring</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Color</th>
                <th className="p-2">Father</th>
                <th className="p-2">Mother</th>
                <th className="p-2">Total Races</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {birds.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-4">
                    No Data Found
                  </td>
                </tr>
              ) : (
                birds.map((b) => {
                  const totalRaces = b?.pigeonRaces
                    ? Object.values(b.pigeonRaces).flat().length
                    : 0;

                  return (
                    <tr
                      key={b.id}
                      className="border-t border-gray-700 hover:bg-gray-800"
                    >
                      <td className="p-2">{b.name || "-"}</td>
                      <td className="p-2">{b.ring || "-"}</td>
                      <td className="p-2">{b.gender || "-"}</td>
                      <td className="p-2">{b.color || "-"}</td>
                      <td className="p-2">{b.father || "-"}</td>
                      <td className="p-2">{b.mother || "-"}</td>

                      <td className="p-2 text-yellow-300 font-semibold">
                        {totalRaces}
                      </td>

                      <td className="p-2 flex justify-center gap-3">
                        <button
                          onClick={() => navigate(`/edit-bird/${b.ring}`)}
                          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => handleDelete(b.id)}
                          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                        >
                          🗑
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>

      </div>
    </Layout>
  );
};

export default MyBirds;