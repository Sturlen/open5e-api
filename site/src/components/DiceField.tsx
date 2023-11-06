import { useState } from "react"
import { DiceRoll } from "@dice-roller/rpg-dice-roller"

export default function DiceField({ formula }: { formula: string }) {
    const [result, setResult] = useState("")

    return (
        <span
            className="dice-roller"
            title={formula}
            onClick={() => setResult(new DiceRoll(formula).total.toString())}
        >
            <span style={{ userSelect: "none" }}>🎲</span>
            {result && <strong> - {result}</strong>}
        </span>
    )
}
