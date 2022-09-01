const Space = (props) => {

  const {heightDesktop, heightTablet = null, heightMobile} = props;

  return (
    <>

      <style jsx>{`

        .space{
          height: ${heightMobile}px;
        }

        @media(min-width: 768px){
          .space{
            height: ${ heightTablet ?? heightDesktop }px;
          }
        }

        @media(min-width: 1024px){
          .space{
            height: ${heightDesktop}px;
          }
        }

        @media(min-width: 1440px){
          .space{
            height: ${(heightDesktop/1440)*100}vw;
          }
        }


      `}</style>

      <div className="space"></div>

    </>
  );
}

export default Space;
