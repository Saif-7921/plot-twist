import { useState } from "react";
import "./App.css";

const genres = ["Fantasy", "Sci-Fi", "Mystery", "Comedy", "Horror", "Adventure"];
const moods = ["Funny", "Wholesome", "Dark", "Chaotic", "Emotional", "Mysterious"];

function App() {
  const [character, setCharacter] = useState("");
  const [setting, setSetting] = useState("");
  const [genre, setGenre] = useState("Comedy");
  const [mood, setMood] = useState("Funny");
  const [chaos, setChaos] = useState(60);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);

  const surpriseMe = () => {
  const randomCharacters = [
    "A time-travelling student",
    "A detective cat",
    "A retired wizard",
    "A robot who hates technology",
    "A street magician",
    "A chef who can read minds",
    "A delivery rider with a secret",
    "A librarian who can enter books",
  ];

  const randomSettings = [
    "A crowded Hyderabad metro",
    "A luxury hotel",
    "A tiny village in India",
    "An abandoned space station",
    "A mysterious university",
    "A rooftop restaurant",
    "A forgotten amusement park",
    "A city where nobody sleeps",
  ];

  const randomGenres = [
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Comedy",
    "Horror",
    "Adventure",
  ];

  const randomMoods = [
    "Funny",
    "Wholesome",
    "Dark",
    "Chaotic",
    "Emotional",
    "Mysterious",
  ];

  setCharacter(
    randomCharacters[
      Math.floor(Math.random() * randomCharacters.length)
    ]
  );

  setSetting(
    randomSettings[
      Math.floor(Math.random() * randomSettings.length)
    ]
  );

  setGenre(
    randomGenres[
      Math.floor(Math.random() * randomGenres.length)
    ]
  );

  setMood(
    randomMoods[
      Math.floor(Math.random() * randomMoods.length)
    ]
  );

  setChaos(Math.floor(Math.random() * 61) + 40);
};

  const generateStory = async (customChaos = chaos) => {
  if (!character.trim() || !setting.trim()) {
    alert("Please enter a character and setting.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(
      "https://ydvn4cqjfsk24wxo63lw5wi36u0nkker.lambda-url.ap-south-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          character: character.trim(),
          setting: setting.trim(),
          genre,
          mood,
          chaos: Number(customChaos),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || "Failed to generate story.");
    }

    setStory({
      title: data.title,
      text: data.story,
      twist: data.twist,
    });
  } catch (error) {
    console.error("Story generation error:", error);
    alert(`Unable to create story: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  const resetStory = () => {
    setStory(null);
    setCharacter("");
    setSetting("");
  };

  return (
    <div className="app">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <nav className="navbar">
        <div className="logo">
          <span className="logo-symbol">✦</span>
          PlotTwist
        </div>

       <div className="nav-badge">
         <span></span>
          Creative Engine
      </div>
      </nav>

      <main className="container">
        {!story ? (
          <>
            <section className="hero">
              <div className="eyebrow">
                ✨ YOUR IMAGINATION, AMPLIFIED
              </div>

              <h1>
                Every story
                <br />
                deserves a <span>twist.</span>
              </h1>

              <p>
  Turn a simple idea into an unexpected story.
  Choose your ingredients, control the chaos, and see what happens.
</p>
            </section>

            <section className="creator-card">
              <div className="card-header">
                <div>
                  <h2>Create your story</h2>
                  <p>Give us a few ingredients. We'll handle the chaos.</p>
                </div>

                <div className="sparkle">✦</div>
              </div>

              <div className="form-grid">
                <div className="field full">
                  <label>CHARACTER</label>
                  <input
                    value={character}
                    onChange={(e) => setCharacter(e.target.value)}
                    placeholder="e.g. A broke college student"
                  />
                </div>

                <div className="field">
                  <label>SETTING</label>
                  <input
                    value={setting}
                    onChange={(e) => setSetting(e.target.value)}
                    placeholder="e.g. Hyderabad Metro"
                  />
                </div>

                <div className="field">
                  <label>GENRE</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    {genres.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label>MOOD</label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  >
                    {moods.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="chaos-section">
                  <div className="chaos-header">
                    <label>CHAOS LEVEL</label>
                    <span>
                      {chaos < 35
                        ? "Calm"
                        : chaos < 70
                        ? "Unexpected"
                        : "Absolutely Insane"}
                    </span>
                  </div>

                  <input
                    className="chaos-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={chaos}
                    onChange={(e) => setChaos(e.target.value)}
                  />

                  <div className="slider-labels">
                    <span>Predictable</span>
                    <span>Plot twist</span>
                    <span>CHAOS</span>
                  </div>
                </div>
              </div>

              <button
                className="generate-button"
                onClick={generateStory}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loader"></span>
                    Creating your story...
                  </>
                ) : (
                  <>✦ Create My Story</>
                )}
              </button>

              <p className="powered">
  Creative Story Engine • Built with AWS
</p>
            </section>

            <section className="examples">
  <p>NEED INSPIRATION?</p>

  <div className="example-pills">
    <button onClick={surpriseMe}>
      🎲 Surprise Me
    </button>

    <button
      onClick={() => {
        setCharacter("A time-travelling student");
        setSetting("A crowded Hyderabad metro");
        setGenre("Sci-Fi");
        setMood("Funny");
        setChaos(85);
      }}
    >
      🚇 Time-travelling student
    </button>

    <button
      onClick={() => {
        setCharacter("A detective cat");
        setSetting("A luxury hotel");
        setGenre("Mystery");
        setMood("Mysterious");
        setChaos(55);
      }}
    >
      🐈 Detective cat
    </button>

    <button
      onClick={() => {
        setCharacter("A robot who hates technology");
        setSetting("A small Indian village");
        setGenre("Comedy");
        setMood("Chaotic");
        setChaos(90);
      }}
    >
      🤖 Confused robot
    </button>
  </div>
</section>
          </>
        ) : (
          <section className="story-page">
            <button className="back-button" onClick={resetStory}>
              ← Create another
            </button>

            <article className="story-card">
              <div className="story-meta">
                {genre} · {mood} · Chaos {chaos}%
              </div>

              <h1>{story.title}</h1>

              <div className="story-divider"></div>

              <div className="story-text">
                {story.text.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="twist-box">
                <span>✦ THE TWIST</span>
                <p>{story.twist}</p>
              </div>

              <div className="story-actions">
  <button onClick={generateStory}>
    🔀 Remix the Twist
  </button>

  <button
    onClick={() => {
      setChaos(
        Math.min(
          100,
          Number(chaos) + Math.floor(Math.random() * 25) + 10
        )
      );

      generateStory();
    }}
  >
    🎲 Make it crazier
  </button>

  <button
    onClick={() =>
      navigator.clipboard.writeText(
        `${story.title}\n\n${story.text}\n\nTHE TWIST:\n${story.twist}`
      )
    }
  >
    ⧉ Copy story
  </button>
</div>
            </article>
          </section>
        )}
      </main>

      <footer>
        <span>PlotTwist</span>
        <span>Creative AI Experiment · AWS Weekend Challenge 2026</span>
      </footer>
    </div>
  );
}

export default App;