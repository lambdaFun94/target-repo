type CTAButtonProps = {
  buttonText: string;
  url: string;
  color?: string;
};

const CTAButton = (props: CTAButtonProps) => {
  const { buttonText, url, color } = props;

  return (
    <a
      href={url}
      className={"py-4 px-6 text-base font-bold text-white rounded-lg "}
      style={{ background: color ? color : "#000000" }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {buttonText}
    </a>
  );
};

export default CTAButton;
