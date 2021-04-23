import styled from 'styled-components'
import Text from '../Text/Text'
import { tags, sizes, HeadingProps } from './types'

const style = {
  [sizes.MD]: {
    fontSize: '20px',
    fontSizeLg: '20px',
  },
  [sizes.LG]: {
    fontSize: '28px',
    fontSizeLg: '28px',
  },
  [sizes.XL]: {
    fontSize: '32px',
    fontSizeLg: '40px',
  },
  [sizes.XXL]: {
    fontSize: '48px',
    fontSizeLg: '64px',
  },
}

const Heading = styled(Text).attrs({ bold: false })<HeadingProps>`
  font-size: ${({ size }) => style[size || sizes.MD].fontSize};
  font-weight: 400;
  line-height: 1.1;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: ${({ size }) => style[size || sizes.MD].fontSizeLg};
  }
`

Heading.defaultProps = {
  as: tags.H2,
}

export default Heading
