/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

type ModalProps = {
    header: string;
    body: string;
    triggerButton: any;
};

export default function Modal({ header, body, triggerButton }: ModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <div onClick={handleOpen}>{triggerButton}</div>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{header}</DialogHeader>
                <DialogBody>{body}</DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}