import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import React from "react";

export const DeleteSavedConfigAlert: React.FC<
  Omit<AlertDialogProps, "leastDestructiveRef" | "children"> & {
    onConfirm: () => void;
  }
> = ({ onConfirm, ...props }) => {
  const leastDestructiveRef = React.useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog {...{ ...props, leastDestructiveRef }}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Delete saved config?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogFooter>
          <ButtonGroup>
            <Button
              variant="ghost"
              colorScheme="gray"
              mr={3}
              onClick={props.onClose}
              ref={leastDestructiveRef}
            >
              Cancel
            </Button>
            <Button colorScheme="red" mr={3} onClick={onConfirm}>
              Delete
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
