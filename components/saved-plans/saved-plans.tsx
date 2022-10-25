import {
  VStack,
  Modal,
  Button,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalHeader,
  Heading,
  ModalFooter,
  useToast,
  useDisclosure,
  ModalOverlay,
} from "@chakra-ui/react";
import { useMountedState } from "react-use";
import { useStore } from "../../store";
import { SavedPlan } from "./saved-plan";
import { DeleteSavedPlanAlert } from "./delete-saved-plan-alert";
import * as React from "react";
import { SavedPlansProvider } from "./context";

export const SavedPlans: React.FC = () => {
  // Because we're using `useLocalStorage`,
  // we need to check if the component is mounted
  // so the SSR matches the initial browser render
  const isMounted = useMountedState();

  const { savedPlans, removePlan } = useStore();
  const toast = useToast();

  const [indexToDelete, setIndexToDelete] = React.useState<number | null>(null);
  const deleteSavedPlan = () => {
    if (indexToDelete === null) return;
    removePlan(indexToDelete);
    toast({ status: "success", title: "Plan deleted" });
  };

  const disclosure = useDisclosure({
    onClose: () => {
      setIndexToDelete(null);
    },
  });

  const savedPlansDisclosure = useDisclosure({
    id: "saved-plans",
  });

  if (!isMounted()) return null;

  return (
    <SavedPlansProvider disclosure={savedPlansDisclosure}>
      <Button
        variant="ghost"
        colorScheme="purple"
        size="sm"
        onClick={savedPlansDisclosure.onOpen}
      >
        Saved Plans
      </Button>

      <Modal {...savedPlansDisclosure}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading fontSize="xl">Saved Plans</Heading>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody py="2">
            <VStack>
              {savedPlans.map((plan, i) => (
                <SavedPlan
                  key={i}
                  plan={plan}
                  index={i}
                  onDelete={() => {
                    setIndexToDelete(i);
                    disclosure.onOpen();
                  }}
                />
              ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={savedPlansDisclosure.onClose}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteSavedPlanAlert
        {...disclosure}
        onConfirm={() => {
          deleteSavedPlan();
          disclosure.onClose();
        }}
      />
    </SavedPlansProvider>
  );
};
