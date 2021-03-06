import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import Guild, { Channel } from "../../interfaces/Guild";
import State from "../../interfaces/State";
import { openModal } from "../../utils/utils";
import HashIcon from "../icons/HashIcon";
import "./styles.scss";

interface Props {
  guild: Guild | null;
  channel: Channel | null;
}

const Navbar: FC<Props> = ({ guild, channel }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.querySelector(".app-container")?.addEventListener("click", () => {
      setOpen(false);
    });
  }, []);

  return (
    <nav className="navbar">
      <div className="guild_title_container">
        <button onClick={() => setOpen((o) => !o)} className="guild_title">
          {guild?.name}
        </button>

        <div className={`guild_title_dropdown ${open ? "active" : ""}`}>
          <div className="dropdown_content">
            <button className="dropdown_btn">Server Settings</button>
            <button onClick={() => openModal("create-channel-modal")} className="dropdown_btn">
              Create Channel
            </button>
            <button onClick={() => openModal("create-category-modal")} className="dropdown_btn">
              Create Category
            </button>
          </div>
        </div>
      </div>
      <div className="channel_info">
        <HashIcon /> <span className="channel_name">{channel?.name?.toLowerCase()}</span>
        {channel?.topic !== null ? (
          <>
            {/* TODO: add modal here for topic */}
            <div className="channel_name_divider"></div>{" "}
            <button onClick={() => openModal("topic-modal")}>{channel?.topic}</button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

const mapToProps = (state: State) => ({
  guild: state.guild.guild,
  channel: state.channel.channel,
});

export default connect(mapToProps)(Navbar);
