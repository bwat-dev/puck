import { DropZone } from "../../../DropZone";
import { rootDroppableId } from "../../../../lib/root-droppable-id";
import { useCallback, useRef } from "react";
import { useAppContext } from "../../context";
import AutoFrame from "@measured/auto-frame-component";
import styles from "./styles.module.css";
import { getClassNameFactory } from "../../../../lib";

const getClassName = getClassNameFactory("PuckPreview", styles);

export const Preview = ({ id = "puck-preview" }: { id?: string }) => {
  const { config, dispatch, state, setStatus, iframe } = useAppContext();

  const Page = useCallback(
    (pageProps) =>
      config.root?.render
        ? config.root?.render({ ...pageProps, editMode: true })
        : pageProps.children,
    [config.root]
  );

  // DEPRECATED
  const rootProps = state.data.root.props || state.data.root;

  const ref = useRef<HTMLIFrameElement>(null);

  return (
    <div
      className={getClassName()}
      id={id}
      onClick={() => {
        dispatch({ type: "setUi", ui: { ...state.ui, itemSelector: null } });
      }}
    >
      {iframe.enabled ? (
        <AutoFrame
          id="preview-frame"
          className={getClassName("frame")}
          data-rfd-iframe
          ref={ref}
          onStylesLoaded={() => {
            setStatus("READY");
          }}
        >
          <Page dispatch={dispatch} state={state} {...rootProps}>
            <DropZone zone={rootDroppableId} />
          </Page>
        </AutoFrame>
      ) : (
        <div id="preview-frame" className={getClassName("frame")}>
          <Page dispatch={dispatch} state={state} {...rootProps}>
            <DropZone zone={rootDroppableId} />
          </Page>
        </div>
      )}
    </div>
  );
};
