import { FunctionComponent, useState, useCallback } from "react";
import { BottomTabsModel } from "./Components/BottomTabDocker/BottomTabsModel";
import { PortalPopup } from "./Components/PortalPopup";
import { WalletModel } from "./Components/BankModels/WalletModel";
import { HostWalletModel } from "./Components/BankModels/HostWalletModel";
import styles from "./css/DualView.module.css";

export const DualView: FunctionComponent = () => {
  const [isBottomTabsModelOpen, setBottomTabsModelOpen] = useState(false);
  const [isWalletModelPopupOpen, setWalletModelPopupOpen] = useState(false);
  const [isHostWalletModelOpen, setHostWalletModelOpen] = useState(false);

  const openBottomTabsModel = useCallback(() => {
    setBottomTabsModelOpen(true);
  }, []);

  const closeBottomTabsModel = useCallback(() => {
    setBottomTabsModelOpen(false);
  }, []);

  const openWalletModelPopup = useCallback(() => {
    setWalletModelPopupOpen(true);
  }, []);

  const closeWalletModelPopup = useCallback(() => {
    setWalletModelPopupOpen(false);
  }, []);

  const openHostWalletModel = useCallback(() => {
    setHostWalletModelOpen(true);
  }, []);

  const closeHostWalletModel = useCallback(() => {
    setHostWalletModelOpen(false);
  }, []);

  return (
    <>
      <div className={styles.dualViewDiv}>
        <div className={styles.rightStreamDiv}>
          <img
            className={styles.rightStreamIcon}
            alt=""
            src="right-stream@2x.png"
          />
        </div>
        <div className={styles.leftStreamDiv}>
          <img
            className={styles.rightStreamIcon}
            alt=""
            src="left-stream@2x.png"
          />
        </div>
        <img
          className={styles.bTPopUpWindow}
          alt=""
          src="desktop-view2@2x.png"
          onClick={openBottomTabsModel}
        />
        <button
          className={styles.guestWalletButton}
          onClick={openWalletModelPopup}
        >
          <b className={styles.authenticateB}>Authenticate</b>
        </button>
        <button
          className={styles.hostWalletButton}
          onClick={openHostWalletModel}
        >
          <b className={styles.authenticateB}>0x919...1563</b>
        </button>
      </div>
      {isBottomTabsModelOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Bottom center"
          onOutsideClick={closeBottomTabsModel}
          setMainViewer={closeBottomTabsModel}
        >
          <BottomTabsModel onClose={closeBottomTabsModel} />
        </PortalPopup>
      )}
      {isWalletModelPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeWalletModelPopup}
          setMainViewer={closeBottomTabsModel}
        >
          <WalletModel onClose={closeWalletModelPopup} />
        </PortalPopup>
      )}
      {isHostWalletModelOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeHostWalletModel}
          setMainViewer={closeBottomTabsModel}
        >
          <HostWalletModel onClose={closeHostWalletModel} />
        </PortalPopup>
      )}
    </>
  );
};
