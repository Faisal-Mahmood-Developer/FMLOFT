// frontend/components/AddBird.jsx

import Layout from "@/components/Layout";
import { useState } from "react";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
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


const AddBird = () => {

  // =========================
  // STATE
  // =========================

  const [bird, setBird] = useState({
    name: "",
    ring: "",
    gender: "",
    color: "",
    strain: "",
    father: "",
    mother: "",
    paternalGrandfather: "",
    paternalGrandmother: "",
    maternalGrandfather: "",
    maternalGrandmother: "",

    pigeonRaces: {},
    fatherRaces: {},
    motherRaces: {},
    paternalGrandfatherRaces: {},
    paternalGrandmotherRaces: {},
    maternalGrandfatherRaces: {},
    maternalGrandmotherRaces: {},
  });

  const [yearInput, setYearInput] = useState({});
  const [error, setError] = useState("");

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

    const updated = [...bird[key][year], emptyRace()];

    setBird({
      ...bird,
      [key]: {
        ...bird[key],
        [year]: updated,
      },
    });
  };

  // =========================
  // RACE CHANGE
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
  // SUBMIT
  // =========================


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!bird.name || !bird.ring || !bird.gender) {
//     setError("Name, Ring, and Gender are required!");
//     return;
//   }

//   try {
//     const res = await fetch(`${BASE_URL}/api/pigeons`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(bird),
//     });

//     const data = await res.json();
//     console.log(data);

//     if (res.ok) {
//       alert("Bird saved successfully ✅");
//       // Reset form
//       setBird({
//         name: "",
//         ring: "",
//         gender: "",
//         color: "",
//         strain: "",
//         father: "",
//         mother: "",
//         paternalGrandfather: "",
//         paternalGrandmother: "",
//         maternalGrandfather: "",
//         maternalGrandmother: "",
//         pigeonRaces: {},
//         fatherRaces: {},
//         motherRaces: {},
//         paternalGrandfatherRaces: {},
//         paternalGrandmotherRaces: {},
//         maternalGrandfatherRaces: {},
//         maternalGrandmotherRaces: {},
//       });
//       setError("");
//     } else {
//       setError(data.message || "Save failed ❌");
//     }
//   } catch (err) {
//     console.error(err);
//     setError("Save failed ❌");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!bird.name || !bird.ring || !bird.gender) {
    setError("Name, Ring, and Gender are required!");
    return;
  }

  try {
    // Duplicate ring check
    const q = query(
      collection(db, "pigeons"),
      where("ring", "==", bird.ring)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      setError("Bird with this ring already exists!");
      return;
    }

    // Save bird
    await addDoc(collection(db, "pigeons"), {
      ...bird,
      createdAt: new Date(),
    });

    alert("Bird saved successfully ✅");

    setBird({
      name: "",
      ring: "",
      gender: "",
      color: "",
      strain: "",
      father: "",
      mother: "",
      paternalGrandfather: "",
      paternalGrandmother: "",
      maternalGrandfather: "",
      maternalGrandmother: "",

      pigeonRaces: {},
      fatherRaces: {},
      motherRaces: {},
      paternalGrandfatherRaces: {},
      paternalGrandmotherRaces: {},
      maternalGrandfatherRaces: {},
      maternalGrandmotherRaces: {},
    });

    setError("");
  } catch (err) {
    console.error(err);
    setError(err.message);
  }
};
  // =========================
  // RENDER RACES SECTION
  // =========================

  const renderRaces = (owner, label) => {
    const key = `${owner}Races`;
    const ownerRaces = bird[key];

    return (
      <div className="border border-gray-700 p-4 rounded bg-gray-900 text-white mb-6">

        <h2 className="text-lg font-semibold mb-3">
          {label} Race Results
        </h2>

        {/* Add Year */}
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
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => addYear(owner)}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
           Add Year
          </button>
        </div>

        {/* Years */}
        {Object.keys(ownerRaces).map((year) => (

          <div
            key={year}
            className="border border-gray-700 p-4 rounded bg-gray-900 text-white mb-6"
          >

            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">{year}</h3>

              <button
                type="button"
                onClick={() => addRace(owner, year)}
                className="px-2 py-1 bg-green-600 text-white rounded"
              >
                + Add Race
              </button>
            </div>

            {/* Races */}
            {ownerRaces[year].map((race, i) => (

              <div key={i} className="flex gap-2 mb-2">

                <input
                  type="number"
                  placeholder="KM"
                  value={race.km}
                  onChange={(e) =>
                    handleRaceChange(
                      owner,
                      year,
                      i,
                      "km",
                      e.target.value
                    )
                  }
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="date"
                  value={race.date}
                  onChange={(e) =>
                    handleRaceChange(
                      owner,
                      year,
                      i,
                      "date",
                      e.target.value
                    )
                  }
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  placeholder="Position"
                  value={race.position}
                  onChange={(e) =>
                    handleRaceChange(
                      owner,
                      year,
                      i,
                      "position",
                      e.target.value
                    )
                  }
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // =========================
  // RENDER
  // =========================

  return (
    <Layout>
      <div className="container mx-auto p-8 max-w-4xl">

        <h1 className="text-2xl mb-6 font-semibold">
          Add New Bird
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Main Fields */}
          {mainFields.map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-medium">
                {field.label}
              </label>

              <input
                type="text"
                value={bird[field.name]}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Gender */}
          <div>
            <label className="block mb-1 font-medium">
              Gender
            </label>

            <select
              value={bird.gender}
              onChange={(e) =>
                handleChange("gender", e.target.value)
              }
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              {genders.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Parents */}
          <h2 className="text-lg font-semibold mt-6">
            Parents
          </h2>

          <input
            type="text"
            placeholder="Father"
            value={bird.father}
            onChange={(e) =>
              handleChange("father", e.target.value)
            }
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Mother"
            value={bird.mother}
            onChange={(e) =>
              handleChange("mother", e.target.value)
            }
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Grandparents */}
          <h2 className="text-lg font-semibold mt-6">
            Grandparents
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Paternal Grandfather"
              value={bird.paternalGrandfather}
              onChange={(e) =>
                handleChange(
                  "paternalGrandfather",
                  e.target.value
                )
              }
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Paternal Grandmother"
              value={bird.paternalGrandmother}
              onChange={(e) =>
                handleChange(
                  "paternalGrandmother",
                  e.target.value
                )
              }
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Maternal Grandfather"
              value={bird.maternalGrandfather}
              onChange={(e) =>
                handleChange(
                  "maternalGrandfather",
                  e.target.value
                )
              }
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Maternal Grandmother"
              value={bird.maternalGrandmother}
              onChange={(e) =>
                handleChange(
                  "maternalGrandmother",
                  e.target.value
                )
              }
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Race Sections for ALL */}
          {owners.map((o) =>
            renderRaces(o.key, o.label)
          )}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded"
          >
            Save Bird
          </button>

        </form>
      </div>
    </Layout>
  );
};

export default AddBird;