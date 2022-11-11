import { FunctionComponent, useState, useCallback, useEffect, ChangeEvent } from "react";
import { NoteContractDisplay, SmallContractDisplay, LargeContractDisplay } from "./ContractDisplays";
import styles from "./EnergyModel.module.css";
import { ContractBuilder, ContractBuilderViewer } from "./ContractBuilder/ContractBuilder";
import { stateAttributes } from "./ContractBuilder/BuilderStateVariables";
import { CatalogModel, CatalogModelViewer } from "./CatalogModel/CatalogModel";
import { VideoStudio, VideoStudioViewer } from "./Video Studio/VideoStudio";
import { DreamSequence, DreamSequenceViewer } from "./DreamSequence/DreamSequence";
import { MetaVerse, MetaVerseViewer } from "./MetaVerse/MetaVerse";
import { useMainViewer } from "../../hooks/useMainViewer";

type EnergyModelType = {
  onClose?: (close:boolean) => void;
  setMainViewer: (mainViewer: JSX.Element) => void;
  isFullscreen?: boolean | undefined;
};


//TODO: find way to make a the contract displays update when the input fields are updated in the Contract Editor
//TODO: create a skeleton for the Energy Model that will be used to display all of the saved contracts and quests from the blockchain
//TODO: create a way to save the contracts and quests to the blockchain
//TODO: create a way to load the contracts and quests from the blockchain (this will be done in the skeleton using cattributes)
//TODO: work on page system for the Energy Model, the first page will always be the DALI contract, the second page will be the personal contract, and the third page will be the quests
//TODO: 


export const EnergyModel: FunctionComponent<EnergyModelType> = ({ onClose, setMainViewer, isFullscreen }) => {
  const [ size , setSize ] = useState(0);
  const [ contractBuilderState, setContractBuilderState ] = useState(stateAttributes.attributes);
  const [ energyModelState, setEnergyModelState ] = useState(0);
  
  const energyModelTabs = [
    <ContractBuilder attributes={contractBuilderState} />,
    <MetaVerse  />,
    <CatalogModel  />,
    <VideoStudio  />,
    <DreamSequence />
  ];  
  const energyModelTabViewers = [
    <ContractBuilderViewer />,
    <MetaVerseViewer  />,
    <CatalogModelViewer  />,
    <VideoStudioViewer  />,
    <DreamSequenceViewer />
  ];
    const handleContractBuilderState = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContractBuilderState({
      ...contractBuilderState,
      [name]: value,
    });
  };
  function handleDoubleClick() {
    setMainViewer(<EnergyModel isFullscreen={true} setMainViewer={function (mainViewer: JSX.Element): void {
      throw new Error("Function not implemented.");
    } } />);
    onClose?.(true);
  }
  function handleDoubleClickExit() {
    setMainViewer(<EnergyModel isFullscreen={false} setMainViewer={function (mainViewer: JSX.Element): void {
    }} />);
  }


  return (
    <div className={styles.energyModelColDiv}>
        <div className={styles.frameDiv}>
          {energyModelTabs[energyModelState]}
          {energyModelTabViewers[energyModelState]}
        </div>
            <div className={styles.bountyPageCarousel}>
            <div className={energyModelState == 2 ? styles.currentViewIcon_isSelected : styles.currentViewIcon} onClick = {() => setEnergyModelState(2)}></div>
            <div className={energyModelState == 1 ? styles.currentViewIcon1_isSelected : styles.currentViewIcon1} onClick = {() => setEnergyModelState(1)}></div>
            <div className={energyModelState == 0 ? styles.currentViewIcon2_isSelected : styles.currentViewIcon2} onClick = {() => setEnergyModelState(0)}></div>
            <div className={energyModelState == 3 ? styles.currentViewIcon1_isSelected : styles.currentViewIcon1} onClick = {() => setEnergyModelState(3)}></div>
            <div className={energyModelState == 4 ? styles.currentViewIcon_isSelected : styles.currentViewIcon} onClick = {() => setEnergyModelState(4)}></div>
            </div>
    </div>
  );
};



