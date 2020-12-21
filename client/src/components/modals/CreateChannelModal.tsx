import { ChangeEvent, FC, FormEvent, useState } from "react";
import { connect } from "react-redux";
import State from "../../interfaces/State";
import Modal from "./index";
import { createChannel } from "../../lib/actions/channel";
import { useParams } from "react-router-dom";
import { getGuildById } from "../../lib/actions/guild";

interface Props {
  error: string | null;
  createChannel: (name: string, guildId: string) => void;
  getGuildById: (id: string) => void;
}

const CreateChannelModal: FC<Props> = ({ error, createChannel, getGuildById }) => {
  const [chName, setName] = useState<string>("");
  const params = useParams<{ guild_id: string }>();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    createChannel(chName, params.guild_id);

    setName("");

    setTimeout(() => {
      getGuildById(params.guild_id);
    }, 500);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    // 1st replace: replace space with '-'
    // 2nd replace: replace multiple '-' with 1 '-'
    // 3rd replace: replace a '-' in the beginning with nothing.
    // 4th replace: remove special characters
    // Thanks to: https://youtu.be/3tG1jUQbuSI?t=510
    value = value
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-/, "")
      .replace(/[!?&²³,;:%£*$^'"()_M+=[\]/]/g, "");

    setName(value);
  }

  return (
    <Modal title="Create Channel" id="create-channel-modal">
      <div className="modal_body">
        <form id="create_channel_form" onSubmit={onSubmit}>
          <div className="form_group">
            <label htmlFor="name">channel name</label>
            <input
              id="name"
              placeholder="new-channel"
              className="form_input"
              value={chName}
              onChange={handleChange}
              maxLength={50}
            />
          </div>
        </form>
      </div>
      <div className="modal_footer">
        <button form="create_channel_form" className="btn blue">
          Create Channel
        </button>
      </div>
    </Modal>
  );
};

const mapToProps = (state: State) => ({
  error: state.channel.error,
});

export default connect(mapToProps, { createChannel, getGuildById })(CreateChannelModal);