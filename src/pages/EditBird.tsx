import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const mainFields = [
  { name: "name", label: "Bird Name", required: true },
  { name: "ring", label: "Ring Number", required: true },
  { name: "color", label: "Color" },
  { name: "strain", label: "Strain" },
];

const genders = ["Male", "Female"];

const owners = [
  { key: "pigeon", label: "Pigeon" },
  { key: "father", label: "Father" },
  { key: "mother", label: "Mother" },
  { key: "paternalGrandfather", label: "Paternal Grandfather" },
  { key: "paternalGrandmother", label: "Paternal Grandmother" },
  { key: "maternalGrandfather", label: "Maternal Grandfather" },
  { key: "maternalGrandmother", label: "Maternal Grandmother" },
];

const EditBird = () => {
  const { ring } = useParams();
  const navigate = useNavigate();

  const [bird, setBird] = useState(null);
  const [yearInput, setYearInput] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH EXISTING DATA
  // =========================
useEffect(() => {
  const fetchBird = async () => {
    try {
      const q = query(
        collection(db, "pigeons"),
        where("ring", "==", ring)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("Bird not found");
        setLoading(false);
        return;
      }

      const document = snapshot.docs[0];

      setBird({
        id: document.id,
        ...document.data(),
      });

    } catch (err) {
      console.error(err);
      setError("Failed to load bird");
    } finally {
      setLoading(false);
    }
  };

  fetchBird();
}, [ring]);
  // =========================
  // HELPERS
  // =========================
  const emptyRace = () => ({
    km: "",
    date: "",
    position: "",
  });

  const handleChange = (field, value) =>
    setBird({ ...bird, [field]: value });

  // =========================
  // ADD YEAR
  // =========================
  const addYear = (owner) => {
    const year = yearInput[owner];
    if (!year) return;

    const key = `${owner}Races`;
    const updated = { ...bird[key] };

    if (updated[year]) return;

    updated[year] = [];

    setBird({
      ...bird,
      [key]: updated,
    });

    setYearInput({ ...yearInput, [owner]: "" });
  };

  // =========================
  // ADD RACE
  // =========================
  const addRace = (owner, year) => {
    const key = `${owner}Races`;

    const updated = [...(bird[key][year] || []), emptyRace()];

    setBird({
      ...bird,
      [key]: {
        ...bird[key],
        [year]: updated,
      },
    });
  };

  // =========================
  // UPDATE RACE
  // =========================
  const handleRaceChange = (owner, year, index, field, value) => {
    const key = `${owner}Races`;

    const updated = [...bird[key][year]];
    updated[index][field] = value;

    setBird({
      ...bird,
      [key]: {
        ...bird[key],
        [year]: updated,
      },
    });
  };

  // =========================
  // UPDATE SUBMIT
  // =========================
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/api/pigeons/${ring}`,
  //       {
  //         method: "PUT", // ✅ IMPORTANT
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(bird),
  //       }
  //     );

  //     const data = await res.json();
  //     console.log(data);

  //     alert("Bird updated successfully ✅");
  //     navigate("/birds");
  //   } catch (err) {
  //     console.error(err);
  //     setError("Update failed");
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { id, ...birdData } = bird;

    await updateDoc(doc(db, "pigeons", id), birdData);

    alert("Bird updated successfully ✅");

    navigate("/my-birds");

  } catch (err) {
    console.error(err);
    setError("Update failed");
  }
};

  // =========================
  // RENDER RACES
  // =========================
  const renderRaces = (owner, label) => {
    const key = `${owner}Races`;
    const ownerRaces = bird[key] || {};

    return (
      <div className="border p-4 rounded bg-gray-900 text-white mb-6">

        <h2 className="text-lg font-semibold mb-3">
          {label} Race Results
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Year"
            value={yearInput[owner] || ""}
            onChange={(e) =>
              setYearInput({
                ...yearInput,
                [owner]: e.target.value,
              })
            }
            className="w-full p-2 bg-gray-800 border rounded"
          />

          <button
            type="button"
            onClick={() => addYear(owner)}
            className="bg-blue-600 px-3 py-1 rounded"
          >
            Add Year
          </button>
        </div>

        {Object.keys(ownerRaces).map((year) => (
          <div key={year} className="mb-4">

            <div className="flex justify-between mb-2">
              <h3>{year}</h3>

              <button
                type="button"
                onClick={() => addRace(owner, year)}
                className="bg-green-600 px-2 py-1 rounded"
              >
                + Race
              </button>
            </div>

            {ownerRaces[year].map((race, i) => (
              <div key={i} className="flex gap-2 mb-2">

                <input
                  type="number"
                  value={race.km}
                  onChange={(e) =>
                    handleRaceChange(owner, year, i, "km", e.target.value)
                  }
                  className="w-full p-2 bg-gray-800 border rounded"
                />

                <input
                  type="date"
                  value={race.date}
                  onChange={(e) =>
                    handleRaceChange(owner, year, i, "date", e.target.value)
                  }
                  className="w-full p-2 bg-gray-800 border rounded"
                />

                <input
                  type="text"
                  value={race.position}
                  onChange={(e) =>
                    handleRaceChange(owner, year, i, "position", e.target.value)
                  }
                  className="w-full p-2 bg-gray-800 border rounded"
                />

              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // =========================
  // STATES
  // =========================
  if (loading)
    return (
      <Layout>
        <p className="p-8 text-center text-white">Loading...</p>
      </Layout>
    );

  if (!bird)
    return (
      <Layout>
        <p className="p-8 text-center text-white">No Data Found</p>
      </Layout>
    );

  // =========================
  // UI
  // =========================
  return (
    <Layout>
      <div className="container mx-auto p-8 max-w-4xl">

        <h1 className="text-2xl mb-6">Edit Bird</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Main Fields */}
          {mainFields.map((field) => (
            <input
              key={field.name}
              type="text"
              value={bird[field.name] || ""}
              onChange={(e) =>
                handleChange(field.name, e.target.value)
              }
              className="w-full p-2 bg-gray-800 border rounded text-white"
            />
          ))}

          {/* Gender */}
          <select
            value={bird.gender || ""}
            onChange={(e) =>
              handleChange("gender", e.target.value)
            }
            className="w-full p-2 bg-gray-800 border rounded text-white"
          >
            <option value="">Select Gender</option>
            {genders.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>

          {/* Parents */}
          <input
            type="text"
            value={bird.father || ""}
            onChange={(e) =>
              handleChange("father", e.target.value)
            }
            className="w-full p-2 bg-gray-800 border rounded text-white"
          />

          <input
            type="text"
            value={bird.mother || ""}
            onChange={(e) =>
              handleChange("mother", e.target.value)
            }
            className="w-full p-2 bg-gray-800 border rounded text-white"
          />

          {/* Grandparents */}
          <input
            type="text"
            value={bird.paternalGrandfather || ""}
            onChange={(e) =>
              handleChange("paternalGrandfather", e.target.value)
            }
            className="w-full p-2 bg-gray-800 border rounded text-white"
          />

          <input
            type="text"
            value={bird.paternalGrandmother || ""}
            onChange={(e) =>
              handleChange("paternalGrandmother", e.target.value)
            }
            className="w-full p-2 bg-gray-800 border rounded text-white"
          />

          {/* Race Sections */}
          {owners.map((o) =>
            renderRaces(o.key, o.label)
          )}

          {error && <p className="text-red-500">{error}</p>}

          <button className="px-6 py-2 bg-primary rounded">
            Update Bird
          </button>

        </form>
      </div>
    </Layout>
  );
};

export default EditBird;