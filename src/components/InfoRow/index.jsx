import { Tag } from "antd";
import { getColorByStatus } from "../../utils/getColorByStatus";
import PropTypes from "prop-types";
import { InfoRowStyled } from "./styles";

export const InfoRow = ({ label, value, isTag }) => (
  <InfoRowStyled>
    <div className="info-row">
      <strong>{label}</strong>
      {isTag ? (
        <Tag color={getColorByStatus(value)}>{value}</Tag>
      ) : (
        <span>{value}</span>
      )}
    </div>
  </InfoRowStyled>
);

InfoRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  isTag: PropTypes.bool,
};
