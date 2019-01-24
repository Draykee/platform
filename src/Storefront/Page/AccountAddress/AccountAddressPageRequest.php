<?php declare(strict_types=1);

namespace Shopware\Storefront\Page\AccountAddress;

use Shopware\Core\Framework\Struct\Struct;
use Shopware\Storefront\Pagelet\AccountAddress\AccountAddressPageletRequest;
use Shopware\Storefront\Pagelet\ContentHeader\ContentHeaderPageletRequest;

class AccountAddressPageRequest extends Struct
{
    /**
     * @var string|null
     */
    protected $redirectTo;

    /**
     * @var AccountAddressPageletRequest
     */
    protected $accountAddressRequest;

    /**
     * @var ContentHeaderPageletRequest
     */
    protected $headerRequest;

    public function __construct()
    {
        $this->accountAddressRequest = new AccountAddressPageletRequest();
        $this->headerRequest = new ContentHeaderPageletRequest();
    }

    /**
     * @return AccountAddressPageletRequest
     */
    public function getAccountAddressRequest(): AccountAddressPageletRequest
    {
        return $this->accountAddressRequest;
    }

    /**
     * @return string|null
     */
    public function getRedirectTo(): ?string
    {
        return $this->redirectTo;
    }

    /**
     * @param string|null $redirectTo
     */
    public function setRedirectTo(?string $redirectTo): void
    {
        $this->redirectTo = $redirectTo;
    }

    public function getHeaderRequest(): ContentHeaderPageletRequest
    {
        return $this->headerRequest;
    }
}
