import { FunctionComponent, useState, useCallback, ChangeEvent, useEffect } from "react";
import { CatModelFunctions, CatModelType, CatAttributeType } from "../../CatModel/CatButton/CatModelTypes";
import styles from "./ContractBuilder.module.css";
import { AIToolMenu } from "./aiToolMenu/AIToolMenu";
import { MetaDataMenu } from "./MetaDataMenu/MetaDataMenu";
import { QuestContentDisplay } from "./QuestContentDisplay/QuestContentDisplay";
import { QuestLog } from "./QuestLog/QuestLog";
import { MemorizeButton } from "./MemorizeButton";
import { PublishButton } from "./PublishButton";
import { defaultCatModel } from "../../CatModel/CatButton/CatModelTypes";
import { LargeContractDisplay, NoteContractDisplay, SmallContractDisplay } from "../ContractDisplays";

//TODO make the photo upload work
//TODO make the tags work
//TODO add a skeleton checklist for the AI Tool Viewer
//TODO add a code editor to the AI Tool Editor 
//TODO add AI Tool marketplace to the AI Tool Explorer
//TODO add first Quest to log, which is the quest to save the profile.
//TODO add a way to imput default values for contract attributes.
//TODO change type to profileContractType to match the addProfileContract function on the backend
    //TODO fix the description styling
    //TODO fix the image upload button
    //TODO fix the add tag button
  // when the main viewer opens contract builder it will pass the attributes of the contract that is being edited
  // if that case, the attributes will be to create a new node in the contract tree. specifically the first one.



export const ContractBuilder: FunctionComponent<CatModelType> = ({ attributes, functions, ...rest }) => {
    // create the initial content popup that is displayed when the Energy Model is opened
    // create the quest content popup that is displayed when the user clicks on the quest content button
    // create the quest log popup that is displayed when the user clicks on the quest log button
    // create the AI tool popup that is displayed when the user clicks on the AI tool button
    // a lot of this is just setting up the state variables and functions to open and close the popups
    // the actual content of the popups is in the openTab arrays
    const [isQuestContentPopupOpen, setIsQuestContentPopupOpen] = useState(false);
    const [useDataFunction, setUseDataFunction] = useState(functions as CatModelFunctions[]);
    const [isQuestLogPopupOpen, setIsQuestLogPopupOpen] = useState(false);
    const [isAIToolPopupOpen, setIsAIToolPopupOpen] = useState(false);
    const [isQuestMetadataPopupOpen, setIsQuestMetadataPopupOpen] = useState(true);

    useEffect(() => {
      if(attributes !== undefined){
        useDataFunction[0].dataFunctions.setAttributes(attributes);
      } else {
        useDataFunction[0].dataFunctions.setAttributes(defaultCatModel.attributes);
      }
    }, [attributes]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    useDataFunction[0].dataFunctions.setTitle(event.target.value);
  };
const handleBodyChange = (event: ChangeEvent<HTMLInputElement>) => {
  useDataFunction[0].dataFunctions.setContent(event.target.value);
};
    // create a function that will open the quest content popup
    const openQuestContentPopup = useCallback(() => {
      setIsQuestContentPopupOpen(true);
    }, []);
    // create a function that will close the quest content popup
    const closeQuestContentPopup = useCallback(() => {
      setIsQuestContentPopupOpen(false);
    }, []);
    // create a function that will open the quest log popup
    const openQuestLogPopup = useCallback(() => {
      setIsQuestLogPopupOpen(true);
    }, []);
    // create a function that will close the quest log popup
    const closeQuestLogPopup = useCallback(() => {
      setIsQuestLogPopupOpen(false);
    }, []);
    // create a function that will open the AI tool popup
    const openAIToolPopup = useCallback(() => {
      setIsAIToolPopupOpen(true);
    }, []);
    // create a function that will close the AI tool popup
    const closeAIToolPopup = useCallback(() => {
      setIsAIToolPopupOpen(false);
    }, []);
    // create a function that will open the quest metadata popup
    const openQuestMetadataPopup = useCallback(() => {
      setIsQuestMetadataPopupOpen(true);
    }, []);
    // create a function that will close the quest metadata popup
    const closeQuestMetadataPopup = useCallback(() => {
      setIsQuestMetadataPopupOpen(false);
    }, []);
    const [contractBuilderState, setContractBuilderState] = useState(0);
    // create a function that will open the quest metadata popup
    const handlePublish = () => {
      setContractBuilderState(1);
    };
    const handleMemorize = () => {
      setContractBuilderState(2);
    };
    const openTab  = [
      <QuestContentDisplay onClose={closeQuestContentPopup} 
        questContent = {"Drag to upload or start typing to use the default code editor"}
        onPublish = {handlePublish}
        onMemorize = {handleMemorize}  />,
      <QuestLog onClose={closeQuestLogPopup} questLog = {"QuestLog Initiated."} />,
      <AIToolMenu onClose={closeAIToolPopup} />,
      <MetaDataMenu onClose={closeQuestMetadataPopup} />,
    ];

    function isTabOpen(index: number) {
      if (contractBuilderState === index) {
        return(styles.tabOpen
      );}
        return(styles.tabClosed);
    }
  
    const openTabIcon = [
      "../quest-content-icon.svg",
      "../quest-log-icon.svg",
      "../ai-tool-icon.svg",
      "../meta-data-icon.svg",
    ];
    const openTabIconSelected = [
      "../quest-content-icon-selected.svg",
      "../quest-log-icon-selected.svg",
      "../ai-tool-icon-selected.svg",
      "../meta-data-icon-selected.svg",
    ];
    // a popup to select an image from the user's computer
    const imageSelector = (index: number) => {
      if (index === 0) {
        return (
          <div className={styles.imageSelector}>
            <input type="file" accept="image/*" />
          </div>
        );
      }
    };

    const imageUploadButton = (
      <button className={styles.imageUploadButton}>
      <div className={styles.imageUploadButton}>
        <img src="../quest-icon3.svg" />
        <p>Upload Image</p>
      </div>
      </button>
    );
    const stateTitle = attributes[0].data.title[0];
    const stateContent = attributes[0].data.content[0];
    const stateHeader = attributes[0].data.description[0];

    return (
      <div className={styles.contractBuilderBox}>
      <div className={styles.contractBuilderBox}>
          <div className={styles.questInformationDiv}>
            <div className={styles.questHeaderDiv}>
              <input 
                className={styles.addTitleInput}
                id = "title"
                type="text"  
                placeholder={stateTitle[0]}
                onChange = {(e) => handleTitleChange(e)}
              />
              {imageUploadButton}
              <div className={styles.addTagButton1}>
                <b className={styles.addTagB}>Add Tag...</b>
              </div>
              <input
                className={styles.questHeadlineInput}
                type="text"
                placeholder={stateHeader[0]}
              />
            </div>
            <div className={styles.closedButtonModel}>
              <div className={isTabOpen(2)} onClick = {() => setContractBuilderState(2)}>AI Tools</div>
              <div className={isTabOpen(3)} onClick= {() =>setContractBuilderState(3)}>Metadata</div>
              <div className={isTabOpen(1)} onClick = {() =>setContractBuilderState(1)}>Log</div>
              <div className={isTabOpen(0)} onClick = {() =>setContractBuilderState(0)}>Code Editor</div>
            </div>
            <div className={styles.logButtonDiv1}>
              {openTab[contractBuilderState]}
            </div>
          </div>
        <div className={styles.frameDiv3}>
          <div className={styles.frameDiv4}>
            <div className={styles.closedButtonModel}>
                <MemorizeButton attributes={attributes} />
            </div>
              <div className={styles.closedButtonModel}>
                <PublishButton questId={""} title={''} description={''} content={''} tags={''} AITools={''} Metadata={''} Log={''} onPublish={function (_questId: any, _title: any, _description: any, _content: any, _tags: any, _AITools: any, _Log: any, _Metadata: any): { questId: string; title: string; description: string; content: string; tags: string; AITools: string; Log: string; Metadata: string; } {
                throw new Error("Function not implemented.");
              } } />
              </div>
          </div>
            <div className={styles.subContractsDiv}>
              <div className={styles.questTitleDiv}>Admin Profile</div>
              <b className={styles.orangeCreamSodaPowerUp}>
                Orange Cream Soda Power-up
              </b>
              <div className={styles.frameDiv2}>
                <div className={styles.questHeadlineDiv9}>
                  Drag and drop to upload, or click to start typing using the
                  default code editor
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className={styles.modelTitle}>Contract Builder</div>
      </div>
      );
    };

export const ContractBuilderViewer:FunctionComponent<CatModelType> = ({attributes, ...rest}) => {
  const [ size , setSize ] = useState(0);
  const [ contractBuilderState, setContractBuilderState ] = useState(attributes);
  const [ energyModelState, setEnergyModelState ] = useState(0);
  const lines = [
    styles.lineDiv,
    styles.lineDivHalfFull,
    styles.lineDivFull,
  ];
  const lines2 = [
    styles.lineDiv2,
    styles.lineDivHalfFull2,
    styles.lineDivFull2,
  ];
  const [ line , setLine ] = useState(lines[0]);
  const [ line2 , setLine2 ] = useState(lines2[0]);
  const contractType = [
    <div className={styles.questDetailSliders}>
      <NoteContractDisplay attributes={attributes} />
    </div>
  ];
  contractType.push(<div className={styles.questDetailSliders}>
    <SmallContractDisplay attributes={attributes} />
  </div>);
  contractType.push(<div className={styles.questDetailSliders}>
    <LargeContractDisplay attributes={attributes} />
  </div>);
  const [ visableContract, setVisableContract ] = useState(contractType[size]);
  const handleBigClick = () => {
    if (size < contractType.length - 1) {
      setSize(size + 1);
      setVisableContract(contractType[size + 1]);
      setLine(lines[size + 1]);
      setLine2(lines2[size + 1]);
    }
    return {visableContract}
    };
  const handleSmallClick = () => {
    if (size > 0) {
      setSize(size - 1);
      setVisableContract(contractType[size-1]);
      setLine(lines[size - 1]);
      setLine2(lines2[size - 1]);
    }
    return {visableContract}
  };
  function questDetailSliders() {
    return (
      <div className={styles.questDetailSliders}>
        {visableContract}
      </div>
    );
  }
  return (
    <div className={styles.contractBuilderBoxView}>
    <div className={styles.questBrowserDiv}>
      <div className={styles.zoomBarDiv}>
        <button className={styles.div} onClick={handleSmallClick}>-</button>
        <div className={styles.eatSpace}>
          <div className={line} />
          <div className={line2} />
        </div>
        <button className={styles.div} onClick={handleBigClick}>+</button>
      </div>
      <div className={styles.questBrowserBody}>
        {questDetailSliders()}
      </div>     
  </div> 
  </div>
  )
}