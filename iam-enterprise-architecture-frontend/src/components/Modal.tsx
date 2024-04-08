/* eslint-disable @typescript-eslint/no-explicit-any */
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
            <Dialog placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} open={open} handler={handleOpen}>
                <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{header}</DialogHeader>
                <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{body}</DialogBody>
                <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    >
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}