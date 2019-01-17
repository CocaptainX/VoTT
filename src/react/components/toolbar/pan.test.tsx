import React from "react";
import { IToolbarItemProps, ToolbarItemType } from "./toolbarItem";
import { mount, ReactWrapper } from "enzyme";
import IProjectActions, * as projectActions from "../../../redux/actions/projectActions";
import MockFactory from "../../../common/mockFactory";
import { EditorMode } from "../../../models/applicationState";
import { Pan } from "./pan";
import Canvas from "../pages/editorPage/canvas";

describe("Pan Toolbar Item", () => {
    const testProject = MockFactory.createTestProject("TestProject");
    const clickHandler = jest.fn();
    const actions = (projectActions as any) as IProjectActions;
    let wrapper: ReactWrapper<IToolbarItemProps> = null;

    function createComponent(props: IToolbarItemProps) {
        return mount(<Pan {...props} />);
    }

    function createProps(): IToolbarItemProps {
        return {
            name: "panCanvas",
            tooltip: "Pan",
            icon: "fa-arrows-alt",
            group: "canvas",
            type: ToolbarItemType.State,
            actions,
            active: true,
            project: testProject,
            onClick: clickHandler,
            onEditorModeChange: jest.fn(),
            canvas: MockFactory.createTestCanvas(),
        };
    }

    beforeAll(() => {
        const canvasMock = Canvas;
        canvasMock.prototype.setSelectionMode = jest.fn((selectionMode) => selectionMode);
    });

    it("Sets the editor mode to Rectangle on click", async () => {
        actions.saveProject = jest.fn(() => Promise.resolve());
        const props = createProps();
        wrapper = createComponent(props);

        await MockFactory.flushUi(() => wrapper.simulate("click"));

        expect(props.onEditorModeChange).toBeCalledWith(EditorMode.None);
    });
});