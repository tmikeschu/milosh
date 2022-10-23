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

  return (
    <FormControl as={VStack} key={day} h="60" flex="1" {...formControlProps}>
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
        value={store[day]}
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

      <Box
        onClick={() => store.setSelectedDay(day)}
        h="full"
        cursor="pointer"
        role="button"
      >
        <Slider
          colorScheme="purple"
          value={store[day]}
          onChange={(value) => store.setDay({ day, value })}
          orientation="vertical"
          min={0}
          max={StoreUtils.getMax(store) + 1}
          focusThumbOnChange={false}
          {...sliderProps}
          pointerEvents="auto"
          isDisabled={
            sliderProps.isDisabled ||
            formControlProps.isDisabled ||
            store.selectedDay !== day
          }
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb {...sliderThumbProps} />
        </Slider>
      </Box>
    </FormControl>
  );
};
