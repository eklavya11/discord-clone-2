import { FC, FormEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ErrorMessage from "../../components/error-message";
import XIcon from "../../components/icons/XIcon";
import { Channel } from "../../interfaces/Guild";
import State from "../../interfaces/State";
import { getChannelById, updateChannel } from "../../lib/actions/channel";
import { parseChannelName } from "../../utils/utils";
import "./styles.scss";

interface Props {
  error: string | null;
  channel: Channel | null;
  getChannelById: (channelId: string, guildId: string) => void;
  updateChannel: (channelId: string, guildId: string, data: unknown) => void;
}

const ChannelSettingsPage: FC<Props> = ({ channel, error, getChannelById, updateChannel }) => {
  const { guild_id, channel_id } = useParams<{ guild_id: string; channel_id: string }>();
  const history = useHistory();
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    getChannelById(channel_id, guild_id);
  }, [getChannelById, channel_id, guild_id]);

  useEffect(() => {
    if (channel?._id) {
      setName(channel?.name);
      setTopic(channel?.topic || "");
    }
  }, [channel]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    updateChannel(channel_id, guild_id, {
      topic: topic,
      name: name,
    });
  }

  function closeSettings() {
    history.goBack();
  }

  return (
    <div className="settings_page_container">
      <div className="settings_page_sidebar">
        <div className="settings_page_content">
          <div className="settings_page_sidebar_items">
            <div className="settings_page_item btn dark active">Overview</div>
            <div className="settings_page_divider"></div>
            <button className="btn danger">Delete Channel</button>
          </div>
        </div>
      </div>

      <div className="settings_page_overview">
        <div className="settings_page_content">
          <div className="settings_page_title">
            <h3>Overview</h3>

            <button onClick={closeSettings} className="settings_page_close">
              <XIcon />
            </button>
          </div>

          <form onSubmit={onSubmit}>
            {error ? <ErrorMessage message={error} type="warning" /> : null}
            <div className="form_group">
              <label htmlFor="channel_name">Channel Name</label>
              <input
                id="channel_name"
                value={name}
                onChange={(e) => setName(parseChannelName(e.target.value))}
                className="form_input"
                maxLength={50}
              />
            </div>
            <div className="form_group">
              <label htmlFor="channel_topic">Channel Topic</label>
              <textarea
                id="channel_topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="form_input"
                maxLength={1024}
              ></textarea>
            </div>

            <button className="btn blue submit" type="submit">
              Save settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapToProps = (state: State) => ({
  channel: state.channel.channel,
  error: state.channel.error,
});

export default connect(mapToProps, { getChannelById, updateChannel })(ChannelSettingsPage);
