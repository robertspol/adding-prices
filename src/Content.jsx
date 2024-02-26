import { useEffect, useRef, useState } from "react";

const Content = ({ type, selectedAll }) => {
    const priceRefs = useRef({});

    const [isChecked, setIsChecked] = useState({
        apples: false,
        bananas: false,
        oranges: false,
        cherries: false,
        grapes: false,

        lettuce: false,
        cucumber: false,
        garlic: false,
        onion: false,
        potato: false,
    });

    const [prices, setPrices] = useState({
        apples: "",
        bananas: "",
        oranges: "",
        cherries: "",
        grapes: "",

        lettuce: "",
        cucumber: "",
        garlic: "",
        onion: "",
        potato: "",
    });

    useEffect(() => {
        if (!selectedAll && type === "Warzywa") {
            setIsChecked({
                apples: false,
                bananas: false,
                oranges: false,
                cherries: false,
                grapes: false,
            });
        } else if (!selectedAll && type === "Owoce") {
            setIsChecked({
                lettuce: false,
                cucumber: false,
                garlic: false,
                onion: false,
                potato: false,
            });
        }
    }, [selectedAll, type]);

    const handleProductSelection = (fruit) => {
        setIsChecked((prev) => ({
            ...prev,
            [fruit]: !prev[fruit],
        }));
    };

    const handleEnterPrice = (fruit, price) => {
        const enteredPrice = Number(price);

        if (isNaN(enteredPrice)) {
            alert("Podaj wartość liczbową.");
            return;
        }

        setPrices((prev) => ({
            ...prev,
            [fruit]: enteredPrice,
        }));
    };

    const handleSetPrice = (fruit) => {
        if (priceRefs.current[fruit]) {
            priceRefs.current[fruit].textContent = prices[fruit];
        }
    };

    const fruits =
        type === "Owoce"
            ? [
                  { value: "apples", name: "Jabłka" },
                  { value: "bananas", name: "Banany" },
                  { value: "oranges", name: "Pomarańcze" },
                  { value: "cherries", name: "Wiśnie" },
                  { value: "grapes", name: "Winogrono" },
              ]
            : [
                  { value: "lettuce", name: "Sałata" },
                  { value: "cucumber", name: "Ogórek" },
                  { value: "garlic", name: "Czosnek" },
                  { value: "onion", name: "Cebula" },
                  { value: "potato", name: "Ziemniak" },
              ];

    const handleSelectedInputs = () => {
        const inputsToDisplay = fruits.filter(
            (fruit) => isChecked[fruit.value] || selectedAll
        );

        const inputs = inputsToDisplay.map((fruit) => (
            <div key={fruit.value} className="prices-input-wrapper">
                <label htmlFor={fruit.value}>{fruit.name}</label>
                <input
                    type="text"
                    id={fruit.value}
                    placeholder="Cena"
                    value={prices[fruit.value]}
                    onChange={(e) =>
                        handleEnterPrice(fruit.value, e.target.value)
                    }
                />
                <button
                    className="btn"
                    onClick={() => handleSetPrice(fruit.value)}
                >
                    Dodaj cenę
                </button>
            </div>
        ));

        return inputs;
    };

    const fruitsList = fruits.map((fruit) => (
        <li key={fruit.value}>
            <div className="li-inside-wrapper">
                <input
                    type="checkbox"
                    onChange={() => handleProductSelection(fruit.value)}
                    checked={
                        selectedAll ? true : isChecked[fruit.value] || false
                    }
                    id={fruit.value}
                />

                <label htmlFor={fruit.value}>{fruit.name}</label>

                <div
                    ref={(ref) => {
                        priceRefs.current[fruit.value] = ref;
                    }}
                ></div>
            </div>
        </li>
    ));

    return (
        <>
            <ul className="fruits-list">{fruitsList}</ul>

            <div className="prices-wrapper">{handleSelectedInputs()}</div>
        </>
    );
};

export default Content;
