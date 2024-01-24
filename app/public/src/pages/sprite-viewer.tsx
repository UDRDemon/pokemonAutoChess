import { t } from "i18next"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import DebugScene from "./component/debug/debug-scene"
import { MainSidebar } from "./component/main-sidebar/main-sidebar"
import { PokemonTypeahead } from "./component/typeahead/pokemon-typeahead"

import { Orientation } from "../../../types/enum/Game"
import { Pkm } from "../../../types/enum/Pokemon"
import { Status } from "../../../types/enum/Status"

import "./sprite-viewer.css"

export function SpriteDebug() {
  const navigate = useNavigate()
  const [pkm, setPkm] = useState<Pkm>(Pkm.RATTATA)
  const [orientation, setOrientation] = useState<Orientation>(
    Orientation.DOWNLEFT
  )
  const [animationType, setAnimType] = useState<string>("Idle")
  const [status, setStatus] = useState<Status | "">("")

  return (
    <div className="sprite-viewer-root">
      <MainSidebar
        page="main_lobby"
        leave={() => navigate("/lobby")}
        leaveLabel={t("back_to_lobby")}
      />
      <div className="sprite-viewer-container">
        <div className="sprite-viewer-toolbar">
          <div className="nes-container">
            <label htmlFor="pokemon-typeahead">Pokemon</label>
            <PokemonTypeahead
              value={pkm}
              onChange={(pkm) => {
                if (pkm) {
                  setPkm(pkm)
                  setAnimType("Idle")
                }
              }}
            />
          </div>
          <div className="nes-container">
            <label htmlFor="sprite-viewer-orientation">Orientation</label>
            <select
              id="sprite-viewer-orientation"
              value={orientation}
              onChange={(e) =>
                setOrientation(e.currentTarget.value as Orientation)
              }
            >
              {Object.entries(Orientation).map(([k, v]) => (
                <option value={v} key={v}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div className="nes-container">
            <label htmlFor="sprite-viewer-anim-type">Anim type</label>
            <select
              id="sprite-viewer-anim-type"
              value={animationType}
              onChange={(e) => setAnimType(e.currentTarget.value)}
            >
              <option value="Idle">Idle</option>
              <option value="Walk">Walk</option>
              <option value="Sleep">Sleep</option>
              <option value="Hurt">Hurt</option>
              <option value="Hop">Hop</option>
              <option value="Attack">Attack</option>
              <option value="Ability">Ability</option>
              <option value="Emote">Emote</option>
            </select>
          </div>
          <div className="nes-container">
            <label htmlFor="sprite-viewer-status">Status</label>
            <select
              id="sprite-viewer-status"
              value={status}
              onChange={(e) => setStatus(e.currentTarget.value as Status)}
            >
              <option value="">None</option>
              {Object.entries(Status).map(([k, v]) => (
                <option value={v} key={v}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="sprite-viewer-sprite">
          <DebugScene
            pkm={pkm}
            orientation={orientation}
            animationType={animationType}
            status={status}
            width={1950}
            height={1000}
          />
        </div>
      </div>
    </div>
  )
}
