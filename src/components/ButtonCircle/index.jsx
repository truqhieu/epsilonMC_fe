import { Button, Tooltip } from "antd";
import PropTypes from "prop-types";

export default function ButtonCircle({
  title,
  enable = true,
  onClick,
  className,
  size,
  icon,
  placement = "bottom",
  btntype = "btn-circle",
  style,
}) {
  return (
    <Tooltip placement={placement} mouseLeaveDelay={0} title={title}>
      <Button
        style={style}
        type={btntype}
        shape="circle"
        className={className}
        size={size}
        disabled={!enable}
        icon={icon}
        onClick={(e) => {
          e.stopPropagation();
          !!onClick && onClick();
        }}
      />
    </Tooltip>
  );
}

ButtonCircle.propTypes = {
  placement: PropTypes.string,
  icon: PropTypes.node,
  enable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  btntype: PropTypes.string,
  fill: PropTypes.string,
  style: PropTypes.object,
};
