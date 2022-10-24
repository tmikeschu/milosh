import React from "react";
import {
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  Text,
  Input,
  SliderProps,
  SliderThumbProps,
  FormControlProps,
  Box,
} from "@chakra-ui/react";
import { Day, StoreUtils, useStore } from "../store";
import { useMountedState } from "react-use";
import { UpDownIcon } from "@chakra-ui/icons";

export type DaySliderProps = {
  day: Day;
  sliderProps?: SliderProps;
  sliderThumbProps?: SliderThumbProps;
  formControlProps?: FormControlProps;
};
export const DaySlider: React.FC<DaySliderProps> = ({
  day,
  sliderProps = {},
  sliderThumbProps = {},
  formControlProps = {},
}) => {
  const store = useStore();
  const getIsMounted = useMountedState();
  const [value] = getIsMounted() ? StoreUtils.getDay(store, day).values : [0];
  const max = (getIsMounted() ? StoreUtils.getMax(store) : 0) + 1;

  return (
    <FormControl as={VStack} key={day} h="full" flex="1" {...formControlProps}>
      <FormLabel color="gray.400" margin="0">
        {day.slice(0, 3)}
      </FormLabel>

      <Input
        color="purple.500"
        fontWeight="bold"
        type="tel"
        variant="flushed"
        w="8"
        textAlign="center"
        value={value}
        onFocus={(e) => {
          e.target.setSelectionRange(0, e.target.value.length);
        }}
        onChange={(e) =>
          store.setDay({ day, value: Number(e.target.value) || 0 })
        }
      />
      <Text fontSize="sm" color="gray.400">
        mi
      </Text>

      <Box h="full" cursor="pointer" role="button">
        <Slider
          aria-label={`${day} miles`}
          colorScheme="purple"
          value={value}
          onChange={(value) => store.setDay({ day, value })}
          orientation="vertical"
          min={0}
          max={max}
          focusThumbOnChange={false}
          {...sliderProps}
          pointerEvents="auto"
          isDisabled={sliderProps.isDisabled || formControlProps.isDisabled}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize="8" {...sliderThumbProps}>
            <Box as={UpDownIcon} />
          </SliderThumb>
        </Slider>
      </Box>
    </FormControl>
  );
};
