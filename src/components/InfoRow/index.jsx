import { Tag } from "antd";
import { getColorByStatus } from "../../utils/getColorByStatus";
import PropTypes from "prop-types";
import { InfoRowStyled } from "./styles";

export const InfoRow = ({ label, value, isTag, color }) => (
  <InfoRowStyled>
    <div className="info-row">
      <span className="info-row-label">{label}</span>
      {isTag ? (
        <Tag color={getColorByStatus(value)}>{value}</Tag>
      ) : (
        <strong className="info-row-value" style={{ color: color }}>
          {value}
        </strong>
      )}
    </div>
  </InfoRowStyled>
);

InfoRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
  isTag: PropTypes.bool,
  color: PropTypes.string,
};
