import {
  Flex,
  Text,
  IconButton,
  ButtonGroup,
  Stack,
  useBreakpointValue,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { Day, useStore } from "../../store";
import { useState } from "react";
import { useSavedPlansContext } from "./context";

const DAY_LABEL_LENGTH = 1;
const TOTAL_LABEL = "Σ";

export const SavedPlan: React.FC<{
  plan: Record<Day, number>;
  index: number;
  onDelete: () => void;
}> = ({ plan, index: i, onDelete }) => {
  const isXs = useBreakpointValue({ xs: true, sm: false }) ?? true;

  const [isActive, setIsActive] = useState(false);
  const savedPlansContext = useSavedPlansContext();

  return (
    <Flex
      w="full"
      justifyContent="center"
      alignItems="center"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <Spacer flex="1" />

      <Stack
        direction="row"
        w="75%"
        maxW="xl"
        key={i}
        boxShadow="base"
        p="2"
        borderRadius="md"
        spacing={["2", "4"]}
        h="20"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Stack
          key="labels"
          fontWeight="medium"
          direction="column"
          fontSize="sm"
          color="gray.400"
          alignItems="flex-end"
        >
          <Text>day</Text>
          <Text>mi</Text>
        </Stack>

        <Divider orientation="vertical" borderColor="purple.200" />

        {(Object.entries(plan) as [Day, number][]).map(([day, number]) => (
          <Stack
            direction="column"
            fontSize={["sm", "md"]}
            alignItems="center"
            key={day}
          >
            <Text color="gray.800" fontWeight="bold">
              {day.slice(0, DAY_LABEL_LENGTH)}
            </Text>
            <Text color="purple.800">{number}</Text>
          </Stack>
        ))}

        <Stack
          key="total"
          fontWeight="bold"
          direction="column"
          fontSize={["sm", "md"]}
          color="purple.500"
          alignItems="center"
        >
          <Text>{TOTAL_LABEL}</Text>
          <Text>{Object.values(plan).reduce((a, b) => a + b)}</Text>
        </Stack>
      </Stack>

      <Flex
        flex="1"
        opacity={isXs || isActive ? "1" : "0"}
        transition="opacity 0.2s"
        px="1"
      >
        <ButtonGroup spacing="px" flexDirection="column">
          <IconButton
            variant="ghost"
            size="sm"
            borderRadius="full"
            onClick={() => {
              useStore.setState(plan);
              savedPlansContext.modalDisclosure.onClose();
            }}
            aria-label="Copy miles plan"
            icon={<CopyIcon />}
          />
          <IconButton
            variant="ghost"
            size="sm"
            borderRadius="full"
            colorScheme="red"
            onClick={onDelete}
            aria-label="Delete miles plan"
            icon={<DeleteIcon />}
          />
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};
