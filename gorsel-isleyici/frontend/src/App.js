import React, { useState, useRef } from "react";
import axios from "axios";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [effectValue, setEffectValue] = useState(50);

  const [selectedIcon, setSelectedIcon] = useState("✨");

  const [icons, setIcons] = useState([]);

  const canvasRef = useRef(null);

  const iconList = [
    "😎",
    "🔥",
    "🚀",
    "✨",
    "💎",
    "👾",
    "❤️",
    "⭐",
    "🍀",
    "🎨",
    "🌈",
    "⚡",
    "🎉",
    "📌",
    "💥",
    "🌸"
  ];

  const handleFile = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setIcons([]);
  };

  const applyEffect = async (effect) => {
    if (!file) return;

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("file", file);

      const value = effectValue / 100;

      const res = await axios.post(
        `http://localhost:8000/process?effect=${effect}&value=${value}`,
        formData
      );

      setResult(res.data.image);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  const addIcon = () => {

    setIcons((prev) => [

      ...prev,

      {

        id: Date.now(),

        char: selectedIcon,

        x: 40,

        y: 40,

        size: 80

      }

    ]);

  };

  const updateIcon = (id, values) => {

    setIcons((prev) =>

      prev.map((icon) =>

        icon.id === id

          ? { ...icon, ...values }

          : icon

      )

    );

  };

  const downloadImage = async () => {

    if (!canvasRef.current) return;

    const canvas = await html2canvas(canvasRef.current, {

      useCORS: true,

      backgroundColor: null,

      scale: window.devicePixelRatio

    });

    const link = document.createElement("a");

    link.download = "tasarim.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

  };

  return (

    <div className="app-container">

      <aside className="sidebar">

        <h2 className="title">

          Görsel Stüdyo

        </h2>

        <input

          className="file-input"

          type="file"

          onChange={handleFile}

        />

        <div className="slider-container">

          <label>

            Etki Yoğunluğu : %{effectValue}

          </label>

          <input

            type="range"

            min="0"

            max="100"

            value={effectValue}

            onChange={(e)=>

              setEffectValue(Number(e.target.value))

            }

          />

        </div>

        <div className="grid-btns">

          {[
            "grayscale",
            "sepia",
            "brightness",
            "contrast",
            "blur",
            "emboss",
            "sharpness",
            "contour",
            "detail",
            "edge_enhance"
          ].map((effect)=>(

            <button

              key={effect}

              onClick={()=>applyEffect(effect)}

              disabled={loading}

            >

              {loading ? "..." : effect}

            </button>

          ))}

        </div>

        <h3>İkonlar</h3>

        <div className="icon-grid">

          {iconList.map((icon)=>(

            <button

              key={icon}

              className="icon-btn"

              onClick={()=>setSelectedIcon(icon)}

            >

              {icon}

            </button>

          ))}

        </div>

        <button

          className="apply-btn"

          onClick={addIcon}

        >

          İkon Ekle

        </button>

        <button

          className="download-btn"

          onClick={downloadImage}

        >

          Kaydet

        </button>

      </aside>
            <main className="viewer">

        {(preview || result) ? (

          <div
  ref={canvasRef}
  className="canvas"
  style={{
    width: "fit-content",
    height: "fit-content"
  }}
>

            <img
              src={result || preview}
              alt="Görsel"
              className="main-img"
            />

            {icons.map((item) => (

              <Rnd
                key={item.id}
                bounds="parent"
                size={{
                  width: item.size,
                  height: item.size
                }}
                position={{
                  x: item.x,
                  y: item.y
                }}

                onDragStop={(e, d) => {

                  updateIcon(item.id, {

                    x: d.x,

                    y: d.y

                  });

                }}

                onResizeStop={(e, direction, ref, delta, position) => {

                  const newSize = parseInt(ref.style.width);

                  updateIcon(item.id, {

                    size: newSize,

                    x: position.x,

                    y: position.y

                  });

                }}

                className="draggable-icon"

                minWidth={40}
                minHeight={40}

              >

                <div
                  className="icon-content"
                  style={{
                    fontSize: item.size * 0.6
                  }}
                >
                  {item.char}
                </div>

              </Rnd>

            ))}

          </div>

        ) : (

          <div className="empty-preview">

            <h2>🖼️</h2>

            <p>Lütfen bir görsel seçin.</p>

          </div>

        )}

      </main>

    </div>

  );

}

export default App;