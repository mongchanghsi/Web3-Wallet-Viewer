// To splice the address into a smaller readable string
export const getDisplayAddress = (
  address: string | null | undefined
): string => {
  if (!address) {
    return '';
  } else {
    return `${address.toString().slice(0, 4)}...${address
      .toString()
      .slice(-4)}`;
  }
};
