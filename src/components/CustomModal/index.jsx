import PropTypes from "prop-types";
import cn from "../../libs/classnames";
import { ModalWrapper } from "./styled";

import styles from "./styles.module.scss";
import "./style.scss";

export default function CustomModal({
  children,
  className = "",
  tilteStart = true,
  hiddenScroll = false,
  ...restProps
}) {
  return (
    <ModalWrapper
      width={1024}
      {...restProps}
      className={cn(className, {
        [styles.titleFlexStart]: tilteStart,
      })}
      hiddenScroll={hiddenScroll}
      maskTransitionName=""
    >
      {children}
    </ModalWrapper>
  );
}

CustomModal.propTypes = {
  tilteStart: PropTypes.bool,
  className: PropTypes.string,
  hiddenScroll: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
